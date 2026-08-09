import { createServerClient } from '@/src/admin/lib/supabase-server'
import About from '@/src/site-pages/About'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://me2i.cm';

export const metadata: Metadata = {
  title: "À propos de ME2I : Expertise et Ingénierie Industrielle au Cameroun",
  description:
    "Découvrez l'histoire, la vision et l'équipe d'ingénieurs et techniciens de ME2I, référence en maintenance industrielle et ingénierie énergétique.",
  keywords: [
    "à propos ME2I",
    "maintenance industrielle Cameroun",
    "maintenances industrielles",
    "industrial maintenance company",
    "ingénierie électrique Douala",
    "experts groupes électrogènes",
    "power engineering services"
  ],
  alternates: {
    canonical: "/a-propos",
  },
  openGraph: {
    title: "À propos de ME2I : Expertise et Ingénierie Industrielle au Cameroun",
    description: "Découvrez notre entreprise et nos équipes d'ingénieurs en maintenance industrielle.",
    url: `${baseUrl}/a-propos`,
    images: [
      {
        url: `${baseUrl}/og-preview.png`,
        width: 1200,
        height: 630,
        alt: "ME2I À propos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "À propos de ME2I : Expertise et Ingénierie Industrielle au Cameroun",
    description: "Découvrez notre entreprise et nos équipes d'ingénieurs en maintenance industrielle.",
    images: [`${baseUrl}/og-preview.png`],
  },
};

export default async function AboutPage() {
  let settingsMap: Record<string, string> = {
    company_name: 'ME2I',
    tagline: 'Maintenance Industrielle & Énergie sans Interruption',
    email: 'contact@me2i.cm',
    phone: '+237 699 00 00 00',
    emergency_phone: '+237 677 00 00 00',
    address: 'Douala / Yaoundé, Cameroun',
    opening_hours: 'Lundi – Vendredi : 7h30 – 18h00',
  }

  try {
    const supabase = await createServerClient()
    const { data } = await supabase.from('company_settings').select('*')

    if (data && data.length > 0) {
      data.forEach((item: any) => {
        if (item.key && item.value) {
          settingsMap[item.key] = item.value
        }
      })
    }
  } catch (err) {
    console.error('Erreur chargement parametres a-propos:', err)
  }

  return <About settings={settingsMap} />
}
