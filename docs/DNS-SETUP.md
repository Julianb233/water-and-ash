# Domain DNS Configuration — waterandashburials.org

## Current State
- **Registrar:** Squarespace Domains
- **DNS Provider:** Google Cloud DNS (ns-cloud-e1..e4.googledomains.com)
- **Current A records:** Point to Squarespace IPs (198.185.159.x, 198.49.23.x)

## Required DNS Changes

### Option A: A Record (Recommended — minimal change)

Update these records at the Google Cloud DNS console:

| Type  | Name | Value           | TTL  |
|-------|------|-----------------|------|
| A     | @    | 76.76.21.21     | 300  |
| CNAME | www  | cname.vercel-dns.com. | 300  |

Delete the existing A records pointing to Squarespace IPs.

### Option B: Change Nameservers (Full Vercel DNS control)

At Squarespace Domains registrar, change nameservers to:
- `ns1.vercel-dns.com`
- `ns2.vercel-dns.com`

This gives Vercel full DNS control. SSL and DNS are managed automatically.

## SSL

SSL is automatic on Vercel once DNS propagates. No manual certificate configuration needed.
Vercel provisions a Let's Encrypt certificate automatically.

## Verification

After DNS changes propagate (5-60 min):
```bash
dig waterandashburials.org +short
# Should return: 76.76.21.21

dig www.waterandashburials.org +short
# Should return: cname.vercel-dns.com.

curl -I https://waterandashburials.org
# Should return 200 with Vercel headers
```

## Vercel Domain Status

Both domains have been added to the `water-and-ash` Vercel project:
- `waterandashburials.org` (apex)
- `www.waterandashburials.org` (www redirect)

## Environment Variables (Production)

Added to Vercel production:
- `NEXT_PUBLIC_SITE_URL=https://waterandashburials.org`
- `STRIPE_SECRET_KEY` (test mode)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (test mode)
- `STRIPE_WEBHOOK_SECRET`
- `RESEND_FROM_EMAIL=info@waterandashburials.org`
- `RESEND_TO_EMAIL=info@waterandashburials.org`
