import { createServerClient } from '@/src/admin/lib/supabase-server'
import ServicesClient from '@/src/site-pages/ServicesClient'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://me2i.cm';

export const metadata: Metadata = {
  title: 'Nos Services et Solutions de Maintenance Industrielle',
  description: 'Services d\'ingénierie MCI au Cameroun : maintenance industrielle, groupes électrogènes, automatisme, armoires électriques et installations UPS.',
  keywords: [
    "maintenance industrielle",
    "maintenances industrielles",
    "industrial maintenance services",
    "maintenance groupe électrogène",
    "generator maintenance Africa",
    "automatisme industriel",
    "industrial automation services",
    "onduleurs industriels",
    "uninterruptible power supply",
    "armoires électriques"
  ],
  alternates: {
    canonical: `${baseUrl}/services`,
  },
  openGraph: {
    title: 'Nos Services et Solutions de Maintenance Industrielle | MCI',
    description: 'Maintenance des groupes électrogènes, automatisme et installations électriques industrielles au Cameroun.',
    url: `${baseUrl}/services`,
    images: [
      {
        url: `${baseUrl}/og-preview.png`,
        width: 1200,
        height: 630,
        alt: "MCI Services et Expertises",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: 'Nos Services et Solutions de Maintenance Industrielle | MCI',
    description: 'Maintenance des groupes électrogènes, automatisme et installations électriques industrielles au Cameroun.',
    images: [`${baseUrl}/og-preview.png`],
  },
}

export default async function ServicesPage() {
  let servicesList: any[] = []

  try {
    const supabase = await createServerClient()
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('status', 'published')
      .order('order_index', { ascending: true })

    servicesList = data || []
  } catch (err) {
    console.error('Erreur chargement services:', err)
  }

  return <ServicesClient initialServices={servicesList} />
}
