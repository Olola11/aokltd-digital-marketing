import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { briefSchema, TIMELINE_LABELS } from '@/lib/studio/brief-schema';
import { getStudioService } from '@/data/studio/services';

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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const parsed = briefSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Please check the form and try again.' },
      { status: 400 }
    );
  }
  const brief = parsed.data;

  // Bots fill the hidden field; accept silently so they learn nothing.
  if (brief.website) return NextResponse.json({ success: true });

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('studio-brief: RESEND_API_KEY is not set');
    return NextResponse.json(
      { error: 'Our enquiry inbox is not connected right now. Please email hello@aokltd.org directly.' },
      { status: 503 }
    );
  }

  const service = getStudioService(brief.service);
  const rows: [string, string][] = [
    ['Name', brief.name],
    ['Email', brief.email],
    ['Service', service?.name ?? brief.service],
    ['For', brief.organisation],
    ['Timeline', TIMELINE_LABELS[brief.timeline]],
    ['Details', brief.details || '—'],
  ];

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: process.env.PROSPECTUS_FROM_EMAIL || 'AOK Studio <noreply@aokltd.org>',
    to: 'hello@aokltd.org',
    replyTo: brief.email,
    subject: `[AOK Studio] ${service?.name ?? 'Project'} brief from ${brief.name}`,
    text: rows.map(([label, value]) => `${label}: ${value}`).join('\n'),
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="color: #00008B; font-size: 20px; margin-bottom: 24px;">New studio brief</h1>
        <table style="width: 100%; border-collapse: collapse; font-size: 15px; color: #333;">
          ${rows
            .map(
              ([label, value]) => `
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; vertical-align: top; width: 100px;">${label}</td>
              <td style="padding: 8px 12px; white-space: pre-wrap;">${escapeHtml(value)}</td>
            </tr>`
            )
            .join('')}
        </table>
        <p style="color: #888; font-size: 13px; margin-top: 32px; border-top: 1px solid #eee; padding-top: 16px;">
          Sent from aokltd.org/studio
        </p>
      </div>
    `,
  });

  if (error) {
    console.error('studio-brief: email failed', error);
    return NextResponse.json(
      { error: 'We could not send your brief just now. Please try again, or email hello@aokltd.org.' },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
