import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Water & Ash Burials - Dignified Sea Burials in San Diego';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #04213f 0%, #0a3a6b 50%, #1a5276 100%)',
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
        {/* Wave decoration */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '120px',
            background: 'linear-gradient(to top, rgba(255,255,255,0.08), transparent)',
            display: 'flex',
          }}
        />

        {/* Logo area */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          {/* Droplet icon */}
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              background: 'linear-gradient(180deg, #5ba3c9 0%, #2c7da0 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />

          <h1
            style={{
              fontSize: '64px',
              color: 'white',
              margin: 0,
              fontWeight: 700,
              letterSpacing: '-1px',
            }}
          >
            Water & Ash Burials
          </h1>

          <p
            style={{
              fontSize: '28px',
              color: 'rgba(255,255,255,0.8)',
              margin: 0,
              letterSpacing: '4px',
              textTransform: 'uppercase',
            }}
          >
            Dignified Sea Burials
          </p>

          <p
            style={{
              fontSize: '22px',
              color: 'rgba(196,164,105,0.9)',
              margin: '8px 0 0',
            }}
          >
            San Diego, California
          </p>
        </div>

        {/* Bottom tagline */}
        <p
          style={{
            position: 'absolute',
            bottom: '32px',
            fontSize: '18px',
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '2px',
          }}
        >
          waterandashburials.org
        </p>
      </div>
    ),
    { ...size }
  );
}
