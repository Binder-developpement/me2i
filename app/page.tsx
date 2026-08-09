import { createServerClient } from '@/src/admin/lib/supabase-server'
import Home from '@/src/site-pages/Home'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://me2i.cm';

export const metadata: Metadata = {
  title: "ME2I : Leader en Maintenance Industrielle et Énergie au Cameroun",
  description:
    "Expertise haut de gamme en maintenance industrielle, groupes électrogènes, automatisme, armoires électriques et installations solaires hybrides à Douala et Yaoundé.",
  keywords: [
    "maintenance industrielle",
    "maintenances industrielles",
    "industrial maintenance",
    "generator maintenance",
    "maintenance groupe électrogène Cameroun",
    "automatisme industriel",
    "industrial automation",
    "onduleurs UPS",
    "énergie sans interruption",
    "electromechanical services"
  ],
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "ME2I : Leader en Maintenance Industrielle et Énergie au Cameroun",
    description: "Expertise en maintenance industrielle, groupes électrogènes, automatisme et installations électriques.",
    url: baseUrl,
    images: [
      {
        url: `${baseUrl}/og-preview.png`,
        width: 1200,
        height: 630,
        alt: "ME2I Maintenance Industrielle et Énergie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ME2I : Leader en Maintenance Industrielle et Énergie au Cameroun",
    description: "Expertise en maintenance industrielle, groupes électrogènes, automatisme et installations électriques.",
    images: [`${baseUrl}/og-preview.png`],
  },
};

export default async function HomePage() {
  let settingsMap: Record<string, string> = {
    company_name: 'ME2I',
    tagline: 'Maintenance Industrielle & Énergie sans Interruption',
    email: 'contact@me2i.cm',
    phone: '+237 699 00 00 00',
    emergency_phone: '+237 677 00 00 00',
    address: 'Douala / Yaoundé, Cameroun',
    opening_hours: 'Lundi – Vendredi : 7h30 – 18h00',
  }
  let dbArticles: any[] = []

  try {
    const supabase = await createServerClient()

    // Fetch company settings
    const { data: settingsData } = await supabase.from('company_settings').select('*')
    if (settingsData && settingsData.length > 0) {
      settingsData.forEach((item: any) => {
        if (item.key && item.value) {
          settingsMap[item.key] = item.value
        }
      })
    }

    // Fetch latest published articles from database
    const { data: articlesData } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(3)

    if (articlesData) {
      dbArticles = articlesData
    }
  } catch (err) {
    console.error('Erreur chargement donnees accueil:', err)
  }

  return (
    <Home
      settings={settingsMap}
      dbSettings={settingsMap}
      articles={dbArticles}
      dbArticles={dbArticles}
    />
  )
}
