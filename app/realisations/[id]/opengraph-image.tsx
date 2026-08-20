import { ImageResponse } from 'next/og'
import { fetchRealisationById } from '@/src/lib/realisations-data'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 3600

export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  let title = 'Projet & Réalisation Industrielle'
  let client = 'Cameroun'
  let category = 'Maintenance Industrielle'

  try {
    const item = await fetchRealisationById(id)
    if (item) {
      if (item.title) title = item.title
      if (item.client) client = item.client
      if (item.category) category = item.category
    }
  } catch (e) {
    // fallback
  }

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
            'radial-gradient(circle at 20px 20px, rgba(255, 255, 255, 0.04) 2%, transparent 0%)',
          backgroundSize: '40px 40px',
          padding: '60px 70px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Top Accent Strip */}
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

        {/* Top Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '8px',
                backgroundColor: '#D16B0A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 900,
                fontSize: '24px',
              }}
            >
              M
            </div>
            <span
              style={{
                fontSize: '26px',
                fontWeight: 900,
                color: '#ffffff',
                letterSpacing: '1.5px',
              }}
            >
              MCI
            </span>
          </div>

          <div
            style={{
              padding: '6px 16px',
              borderRadius: '6px',
              backgroundColor: 'rgba(39, 166, 88, 0.2)',
              border: '1px solid #27A658',
              color: '#4ADE80',
              fontSize: '14px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            {category}
          </div>
        </div>

        {/* Center Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxWidth: '1000px',
          }}
        >
          <span
            style={{
              fontSize: '15px',
              fontWeight: 700,
              color: '#38BDF8',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            Réalisation & Chantier Livré
          </span>
          <h1
            style={{
              fontSize: title.length > 60 ? '42px' : '50px',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {title}
          </h1>
        </div>

        {/* Bottom Details */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '20px',
          }}
        >
          <div style={{ display: 'flex', gap: '24px' }}>
            <span style={{ fontSize: '15px', color: '#94a3b8' }}>
              Client / Site : {client}
            </span>
            <span style={{ fontSize: '15px', color: '#94a3b8' }}>
              • Réalisé par MCI SARL
            </span>
          </div>

          <span
            style={{
              fontSize: '15px',
              color: '#F59E0B',
              fontWeight: 700,
            }}
          >
            mci.cm/realisations
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
