import { kv } from '@vercel/kv';
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// In-memory rate limiting (resets on cold start — sufficient for basic abuse prevention)
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

// Resend is lazy-initialized — only created when RESEND_API_KEY is set
function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(request: NextRequest) {
  try {
    const { email, fingerprint } = await request.json();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    // Rate limit check
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Try KV operations — gracefully fall back if not configured
    let kvAvailable = true;
    try {
      // Check duplicate email
      const existingEmail = await kv.get(`prospectus:email:${normalizedEmail}`);
      if (existingEmail) {
        return NextResponse.json(
          { error: 'This email has already been used to request the prospectus.' },
          { status: 409 }
        );
      }

      // Check duplicate fingerprint
      if (fingerprint) {
        const existingFp = await kv.get(`prospectus:fp:${fingerprint}`);
        if (existingFp) {
          return NextResponse.json(
            { error: 'You have already requested the prospectus from this device.' },
            { status: 409 }
          );
        }
      }

      // Store the request
      const record = {
        email: normalizedEmail,
        fingerprint,
        ip,
        requestedAt: new Date().toISOString(),
        sent: false,
      };

      await kv.set(`prospectus:email:${normalizedEmail}`, record);
      if (fingerprint) {
        await kv.set(`prospectus:fp:${fingerprint}`, {
          email: normalizedEmail,
          requestedAt: record.requestedAt,
        });
      }
      await kv.sadd('prospectus:all_emails', normalizedEmail);
    } catch {
      kvAvailable = false;
      console.warn('Vercel KV not available. Email accepted without persistence:', normalizedEmail);
    }

    // Check if prospectus file exists
    const prospectusPath = path.join(process.cwd(), 'public', 'documents', 'prospectus.pdf');
    const prospectusExists = fs.existsSync(prospectusPath);

    const resend = getResend();

    if (prospectusExists && resend) {
      // Send email with download link
      try {
        await resend.emails.send({
          from: process.env.PROSPECTUS_FROM_EMAIL || 'Apotheosis of Knowledge <noreply@aokltd.org>',
          to: normalizedEmail,
          subject: 'Your AOK Strategic Prospectus',
          html: `
            <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <h1 style="color: #00008B; font-size: 24px; margin-bottom: 16px;">Apotheosis of Knowledge</h1>
              <p style="color: #333; font-size: 16px; line-height: 1.7;">Thank you for your interest in our strategic vision.</p>
              <p style="color: #333; font-size: 16px; line-height: 1.7;">You can download the full prospectus using the link below:</p>
              <a href="https://aokltd.org/documents/prospectus.pdf"
                 style="display: inline-block; background: #00008B; color: white; padding: 14px 28px; text-decoration: none; font-size: 14px; letter-spacing: 1px; margin: 24px 0;">
                DOWNLOAD PROSPECTUS
              </a>
              <p style="color: #888; font-size: 13px; margin-top: 32px;">Apotheosis of Knowledge Limited &middot; RC 1956161 &middot; Lagos, Nigeria</p>
            </div>
          `,
        });

        // Mark as sent in KV
        if (kvAvailable) {
          await kv.set(`prospectus:email:${normalizedEmail}`, {
            email: normalizedEmail,
            fingerprint,
            ip,
            requestedAt: new Date().toISOString(),
            sent: true,
            sentAt: new Date().toISOString(),
          });
        }

        return NextResponse.json({
          success: true,
          message: 'The prospectus has been sent to your email.',
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        return NextResponse.json({
          success: true,
          message: 'Your request has been received. You will receive the prospectus shortly.',
        });
      }
    }

    // Prospectus not yet available
    // TODO: Implement batch send to all stored emails once prospectus.pdf is added
    return NextResponse.json({
      success: true,
      message: 'Thank you. You will receive the prospectus once it becomes available.',
    });
  } catch (error) {
    console.error('Prospectus request error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
