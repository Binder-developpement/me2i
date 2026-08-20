import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 3600

export const alt = 'MCI - Maintenance & Construction Industrielle'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0F1E33',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.05) 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          padding: '60px 70px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Top subtle glow and border */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #D16B0A, #1E7FC3, #27A658)',
          }}
        />

        {/* Header with Brand and Badge */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '8px',
                backgroundColor: '#D16B0A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 900,
                fontSize: '28px',
                letterSpacing: '1px',
              }}
            >
              M
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: '32px',
                  fontWeight: 900,
                  color: '#ffffff',
                  letterSpacing: '2px',
                }}
              >
                MCI
              </span>
              <span
                style={{
                  fontSize: '13px',
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                }}
              >
                Maintenance & Construction Industrielle
              </span>
            </div>
          </div>

          <div
            style={{
              padding: '8px 18px',
              borderRadius: '20px',
              backgroundColor: 'rgba(209, 107, 10, 0.15)',
              border: '1px solid #D16B0A',
              color: '#F59E0B',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            Cameroun - 24h/7j
          </div>
        </div>

        {/* Center Main Headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxWidth: '900px',
          }}
        >
          <span
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#38BDF8',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            Leader en Ingénierie & Énergie
          </span>
          <h1
            style={{
              fontSize: '52px',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: '-0.5px',
            }}
          >
            Maintenance Industrielle, Groupes Électrogènes & Automatisme
          </h1>
          <p
            style={{
              fontSize: '20px',
              color: '#cbd5e1',
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            Continuité énergétique, armoires électriques et installations solaires hybrides à Douala et Yaoundé.
          </p>
        </div>

        {/* Footer Features */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '24px',
          }}
        >
          <div style={{ display: 'flex', gap: '30px' }}>
            <span style={{ fontSize: '15px', color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
              ✓ Centrales Thermiques
            </span>
            <span style={{ fontSize: '15px', color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
              ✓ Onduleurs & UPS
            </span>
            <span style={{ fontSize: '15px', color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
              ✓ Dépannage 24/7
            </span>
          </div>

          <span
            style={{
              fontSize: '16px',
              color: '#ffffff',
              fontWeight: 700,
              letterSpacing: '1px',
            }}
          >
            mci.cm
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
