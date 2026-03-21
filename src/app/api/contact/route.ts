import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  if (record.count >= RATE_LIMIT) return false;
  record.count++;
  return true;
}

function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  return new Resend(process.env.RESEND_API_KEY);
}

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

const SUBJECT_MAP: Record<string, string> = {
  partnership: 'Partnership Enquiry',
  editorial: 'Editorial / Content',
  press: 'Press / Media',
  feedback: 'Feedback',
  other: 'Other',
};

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please enter your name.' },
        { status: 400 }
      );
    }

    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!subject || !SUBJECT_MAP[subject]) {
      return NextResponse.json(
        { error: 'Please select a subject.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please enter a message (at least 10 characters).' },
        { status: 400 }
      );
    }

    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const sanitizedName = name.trim().slice(0, 200);
    const sanitizedEmail = email.toLowerCase().trim();
    const sanitizedMessage = message.trim().slice(0, 5000);
    const subjectLabel = SUBJECT_MAP[subject];

    const resend = getResend();

    if (resend) {
      try {
        await resend.emails.send({
          from: process.env.PROSPECTUS_FROM_EMAIL || 'Apotheosis of Knowledge <noreply@aokltd.org>',
          to: 'hello@aokltd.org',
          replyTo: sanitizedEmail,
          subject: `[AOK Contact] ${subjectLabel} — ${sanitizedName}`,
          html: `
            <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <h1 style="color: #00008B; font-size: 20px; margin-bottom: 24px;">New Contact Form Submission</h1>
              <table style="width: 100%; border-collapse: collapse; font-size: 15px; color: #333;">
                <tr>
                  <td style="padding: 8px 12px; font-weight: 600; vertical-align: top; width: 100px;">Name</td>
                  <td style="padding: 8px 12px;">${sanitizedName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 12px; font-weight: 600; vertical-align: top;">Email</td>
                  <td style="padding: 8px 12px;"><a href="mailto:${sanitizedEmail}" style="color: #4A90E2;">${sanitizedEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 12px; font-weight: 600; vertical-align: top;">Subject</td>
                  <td style="padding: 8px 12px;">${subjectLabel}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 12px; font-weight: 600; vertical-align: top;">Message</td>
                  <td style="padding: 8px 12px; white-space: pre-wrap;">${sanitizedMessage.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td>
                </tr>
              </table>
              <p style="color: #888; font-size: 13px; margin-top: 32px; border-top: 1px solid #eee; padding-top: 16px;">
                Sent via aokltd.org contact form &middot; IP: ${ip}
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Contact email sending failed:', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent. We will get back to you soon.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
