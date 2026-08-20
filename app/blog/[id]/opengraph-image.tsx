import { ImageResponse } from 'next/og'
import { createServerClient } from '@/src/admin/lib/supabase-server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 3600

export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

const isUuid = (str: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str)

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  let title = "Article d'Expertise Technique"
  let category = 'Maintenance Industrielle'
  let date = 'MCI Cameroun'

  try {
    const supabase = await createServerClient()
    const validUuid = isUuid(id)

    let query = supabase.from('articles').select('title, category, created_at')
    if (validUuid) {
      query = query.or(`id.eq.${id},slug.eq.${id}`)
    } else {
      query = query.eq('slug', id)
    }

    const { data } = await query.single()
    if (data) {
      if (data.title) title = data.title
      if (data.category) category = data.category
      if (data.created_at) {
        date = new Date(data.created_at).toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      }
    }
  } catch (e) {
    // fallback to defaults
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
          backgroundColor: '#0B1524',
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
              backgroundColor: '#1E3A5F',
              color: '#38BDF8',
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
              color: '#F59E0B',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            Dossier & Guide Technique
          </span>
          <h1
            style={{
              fontSize: title.length > 70 ? '42px' : '50px',
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
              Publié le {date}
            </span>
            <span style={{ fontSize: '15px', color: '#94a3b8' }}>
              • Par les Ingénieurs MCI
            </span>
          </div>

          <span
            style={{
              fontSize: '15px',
              color: '#38BDF8',
              fontWeight: 700,
            }}
          >
            mci.cm/blog
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
