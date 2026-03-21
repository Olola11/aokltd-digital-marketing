# AOK Website — Deployment Checklist

## Before First Deploy

### Vercel Project Settings
- [ ] Framework Preset: Next.js (should auto-detect)
- [ ] Build Command: `npm run build` (default)
- [ ] Output Directory: `.next` (default)
- [ ] Node.js Version: 18.x or 20.x (LTS)
- [ ] Root Directory: `.` (project root)

### Environment Variables (Add in Vercel Dashboard → Settings → Environment Variables)
- [ ] KV_REST_API_URL (after creating Vercel KV database)
- [ ] KV_REST_API_TOKEN (after creating Vercel KV database)
- [ ] KV_REST_API_READ_ONLY_TOKEN (after creating Vercel KV database)
- [ ] RESEND_API_KEY (after signing up at resend.com)
- [ ] PROSPECTUS_FROM_EMAIL = prospectus@aokltd.org
- [ ] ADMIN_SECRET_KEY = (generate with: openssl rand -hex 32)

### Domain Configuration
- [ ] Custom domain aokltd.org is connected
- [ ] DNS records point to Vercel
- [ ] SSL certificate is provisioned (Vercel does this automatically)
- [ ] www.aokltd.org redirects to aokltd.org (or vice versa — pick one)

### After First Deploy
- [ ] Visit https://aokltd.org — site loads
- [ ] Visit https://aokltd.org/vault — vault loads
- [ ] Visit https://aokltd.org/contact — form renders
- [ ] Test the prospectus form (if env vars are set)
- [ ] Check https://aokltd.org/sitemap.xml — sitemap renders
- [ ] Check https://aokltd.org/robots.txt — robots file renders
- [ ] Submit sitemap to Google Search Console
- [ ] Test social sharing (paste URL in Twitter/Facebook/LinkedIn)

### Optional Post-Launch
- [ ] Set up Vercel Analytics (free tier)
- [ ] Set up Vercel Speed Insights (free tier)
- [ ] Create OG images for social sharing (1200x630px — specs in public/og/README.md)
- [ ] Set up actual email addresses (partnerships@, editorial@, hello@)
- [ ] Upload prospectus PDF when ready
- [ ] Compress oversized images: igbo-ukwu-metallurgy-hero.jpg (1.6MB), geometry-of-dahomey-hero.jpg (1.1MB)
