import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.resolve(__dirname, '../.env.local')

if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8')
  envConfig.split('\n').forEach((line) => {
    const parts = line.split('=')
    if (parts.length >= 2) {
      const key = parts[0].trim()
      const val = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '')
      if (key && !process.env[key]) {
        process.env[key] = val
      }
    }
  })
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials missing')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const ultraLongArticles = [
  {
    title: "Guide ultime du diagnostic et du dépannage des groupes électrogènes de secours : De la mécanique à l'électronique de puissance",
    slug: "guide-ultime-diagnostic-depannage-groupes-electrogenes-secours",
    cover_url: "/images/realisations/realisation_p6_img1.png",
  },
  {
    title: "Conception, calcul et installation des Tableaux Généraux Basse Tension (TGBT) et armoires de distribution industrielle",
    slug: "conception-calcul-installation-tgbt-armoires-distribution-industrielle",
    cover_url: "/images/realisations/realisation_p7_img1.png",
  },
  {
    title: "Automatisme et supervision SCADA : Guide complet de l'intégration de la norme IEC 61131-3 dans l'industrie",
    slug: "automatisme-supervision-scada-guide-complet-norme-iec-61131-3",
    cover_url: "/images/realisations/realisation_p10_img1.png",
  },
  {
    title: "Ingénierie du Froid Industriel : Guide de maintenance des centrales frigorifiques de forte capacité",
    slug: "ingenierie-froid-industriel-guide-maintenance-centrales-frigorifiques",
    cover_url: "/images/realisations/realisation_p12_img1.png",
  },
  {
    title: "Dimensionnement et ingénierie des centrales solaires hybrides avec groupes électrogènes pour sites industriels et miniers",
    slug: "dimensionnement-ingenierie-centrales-solaires-hybrides-groupes-electrogenes",
    cover_url: "/me2isolaire.jpg",
  },
  {
    title: "Qualité de l'énergie électrique industrielle : Harmoniques, transitoires, creux de tension et solutions de dépollution",
    slug: "qualite-energie-electrique-industrielle-harmoniques-transitoires-depollution",
    cover_url: "/images/realisations/realisation_p14_img1.png",
  },
  {
    title: "Maintenance prédictive et analyse vibratoire des machines tournantes industrielles",
    slug: "maintenance-predictive-analyse-vibratoire-machines-tournantes-industrielles",
    cover_url: "/images/realisations/realisation_p15_img1.png",
  },
  {
    title: "Révision majeure et reconditionnement complet (Overhaul) des moteurs diesel industriels",
    slug: "revision-majeure-reconditionnement-complet-overhaul-moteurs-diesel",
    cover_url: "/images/realisations/realisation_p16_img1.png",
  },
  {
    title: "Inverseurs Automatiques de Source (ATS) et Synchro-Couplage : Principes, algorithmes et schémas de puissance",
    slug: "inverseurs-automatiques-source-ats-synchro-couplage-principes-schemas",
    cover_url: "/images/realisations/realisation_p17_img1.png",
  },
  {
    title: "Audit de sécurité électrique et mise aux normes des installations de grande puissance au Cameroun",
    slug: "audit-securite-electrique-mise-aux-normes-installations-grande-puissance",
    cover_url: "/images/realisations/realisation_p19_img1.png",
  }
]

async function updateCoverUrlsInSupabase() {
  console.log('Logging in as dev@me2i.cm to update cover URLs in Supabase...')

  const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
    email: 'dev@me2i.cm',
    password: 'Password123!',
  })

  if (authErr || !authData.session) {
    console.error('Authentication failed:', authErr?.message)
    process.exit(1)
  }

  for (const art of ultraLongArticles) {
    const { data, error } = await supabase
      .from('articles')
      .update({ cover_url: art.cover_url })
      .eq('slug', art.slug)
      .select()

    if (error) {
      console.error(`Error updating "${art.slug}":`, error.message)
    } else {
      console.log(`✓ Updated cover_url for "${art.slug}" -> ${art.cover_url}`)
    }
  }

  console.log('\n🎉 ALL COVER URLS UPDATED SUCCESSFULLY IN SUPABASE DB!')
}

updateCoverUrlsInSupabase()
