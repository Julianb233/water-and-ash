import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Water & Ash Burials - Dignified Sea Burials in San Diego';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a1628 0%, #132042 50%, #1a2d5a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Decorative top border */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
          }}
        />

        {/* Anchor icon */}
        <div
          style={{
            fontSize: '64px',
            marginBottom: '24px',
            display: 'flex',
          }}
        >
          ⚓
        </div>

        {/* Business name */}
        <div
          style={{
            fontSize: '56px',
            fontWeight: 700,
            color: '#d4af37',
            marginBottom: '16px',
            letterSpacing: '2px',
            display: 'flex',
          }}
        >
          Water & Ash Burials
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '28px',
            color: '#e8e2d6',
            marginBottom: '32px',
            opacity: 0.9,
            display: 'flex',
          }}
        >
          Dignified Sea Burials in San Diego
        </div>

        {/* Separator */}
        <div
          style={{
            width: '120px',
            height: '2px',
            background: '#d4af37',
            marginBottom: '32px',
            display: 'flex',
          }}
        />

        {/* Services */}
        <div
          style={{
            fontSize: '20px',
            color: '#b0a890',
            display: 'flex',
            gap: '24px',
          }}
        >
          <span>The Osprey</span>
          <span style={{ color: '#d4af37' }}>·</span>
          <span>White Nights</span>
          <span style={{ color: '#d4af37' }}>·</span>
          <span>Relentless</span>
          <span style={{ color: '#d4af37' }}>·</span>
          <span>At-Home Memorial</span>
        </div>

        {/* Bottom info */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            fontSize: '16px',
            color: '#8090a8',
            display: 'flex',
            gap: '16px',
          }}
        >
          <span>waterandashburials.org</span>
          <span>·</span>
          <span>619-928-9160</span>
        </div>

        {/* Decorative bottom border */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
