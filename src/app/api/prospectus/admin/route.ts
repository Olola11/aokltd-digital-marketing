import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/prospectus/admin
 *
 * Returns all collected prospectus request emails.
 * Protected by Bearer token (ADMIN_SECRET_KEY env var).
 *
 * Usage: curl -H "Authorization: Bearer <key>" https://aokltd.org/api/prospectus/admin
 */
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');

  if (!process.env.ADMIN_SECRET_KEY || authHeader !== `Bearer ${process.env.ADMIN_SECRET_KEY}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const emails = await kv.smembers('prospectus:all_emails');
    const records = await Promise.all(
      (emails as string[]).map(async (email) => {
        const data = await kv.get(`prospectus:email:${email}`);
        return data;
      })
    );

    return NextResponse.json({
      total: records.length,
      emails: records.filter(Boolean),
    });
  } catch {
    return NextResponse.json({ error: 'Database not available' }, { status: 500 });
  }
}
