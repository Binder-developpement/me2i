import BlogClient from '@/src/site-pages/BlogClient'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Blog et Articles d\'Expertise : Maintenance Industrielle et Énergie',
  description: 'Découvrez nos grands dossiers techniques originaux et guides pratiques sur la maintenance des groupes électrogènes, l\'automatisme PLC et l\'efficacité énergétique au Cameroun.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog et Articles d\'Expertise | ME2I Cameroun',
    description: 'Guides pratiques et grands dossiers d\'ingénierie sur la maintenance industrielle et les groupes électrogènes au Cameroun.',
  },
}

const fallbackLongArticles = [
  {
    id: "guide-ultime-diagnostic-depannage-groupes-electrogenes-secours",
    title: "Guide ultime du diagnostic et du dépannage des groupes électrogènes de secours : De la mécanique à l'électronique de puissance",
    slug: "guide-ultime-diagnostic-depannage-groupes-electrogenes-secours",
    category: "Groupes Électrogènes",
    excerpt: "Dossier technique exhaustif pour diagnostiquer, analyser et résoudre l'ensemble des pannes mécaniques, électriques et électroniques sur les générateurs de secours.",
    cover_url: "/images/hero.jpg",
    status: "published",
    created_at: new Date().toISOString(),
  },
  {
    id: "conception-calcul-installation-tgbt-armoires-distribution-industrielle",
    title: "Conception, calcul et installation des Tableaux Généraux Basse Tension (TGBT) et armoires de distribution industrielle",
    slug: "conception-calcul-installation-tgbt-armoires-distribution-industrielle",
    category: "Armoires Électriques",
    excerpt: "Guide technique exhaustif couvrant le dimensionnement des jeu de barres, le calcul du courant de court-circuit Icc, les formes de cloisonnement et la sélectivité des protections.",
    cover_url: "/og-preview.png",
    status: "published",
    created_at: new Date().toISOString(),
  },
  {
    id: "automatisme-supervision-scada-guide-complet-norme-iec-61131-3",
    title: "Automatisme et supervision SCADA : Guide complet de l'intégration de la norme IEC 61131-3 dans l'industrie",
    slug: "automatisme-supervision-scada-guide-complet-norme-iec-61131-3",
    category: "Automatisme et Contrôle",
    excerpt: "Dossier approfondi sur la programmation des automates PLC, le choix des réseaux de terrain (PROFINET, Modbus TCP) et le développement d'interfaces SCADA ergonomiques.",
    cover_url: "/images/hero.jpg",
    status: "published",
    created_at: new Date().toISOString(),
  },
  {
    id: "ingenierie-froid-industriel-guide-maintenance-centrales-frigorifiques",
    title: "Ingénierie du Froid Industriel : Guide de maintenance des centrales frigorifiques de forte capacité",
    slug: "ingenierie-froid-industriel-guide-maintenance-centrales-frigorifiques",
    category: "Froid Industriel",
    excerpt: "Étude approfondie sur la conduite, le diagnostic et l'optimisation énergétique des centrales frigorifiques industrielles à compresseurs vis ou pistons.",
    cover_url: "/og-preview.png",
    status: "published",
    created_at: new Date().toISOString(),
  },
  {
    id: "dimensionnement-ingenierie-centrales-solaires-hybrides-groupes-electrogenes",
    title: "Dimensionnement et ingénierie des centrales solaires hybrides avec groupes électrogènes pour sites industriels et miniers",
    slug: "dimensionnement-ingenierie-centrales-solaires-hybrides-groupes-electrogenes",
    category: "Énergies Renouvelables",
    excerpt: "Guide d'ingénierie complet sur le couplage photovoltaïque, stockage par batteries Lithium LFP et générateurs diesel pour réduire jusqu'à 70% la consommation de carburant.",
    cover_url: "/images/hero.jpg",
    status: "published",
    created_at: new Date().toISOString(),
  },
  {
    id: "qualite-energie-electrique-industrielle-harmoniques-transitoires-depollution",
    title: "Qualité de l'énergie électrique industrielle : Harmoniques, transitoires, creux de tension et solutions de dépollution",
    slug: "qualite-energie-electrique-industrielle-harmoniques-transitoires-depollution",
    category: "Efficacité Énergétique",
    excerpt: "Étude approfondie sur la dépollution des réseaux électriques, la suppression des courants harmoniques et la protection contre les micro-coupures.",
    cover_url: "/og-preview.png",
    status: "published",
    created_at: new Date().toISOString(),
  },
  {
    id: "maintenance-predictive-analyse-vibratoire-machines-tournantes-industrielles",
    title: "Maintenance prédictive et analyse vibratoire des machines tournantes industrielles",
    slug: "maintenance-predictive-analyse-vibratoire-machines-tournantes-industrielles",
    category: "Maintenance Industrielle",
    excerpt: "Dossier technique sur le suivi vibratoire par FFT, l'analyse d'huile et la thermographie pour anticiper la casse des roulements, pompes et moteurs.",
    cover_url: "/images/hero.jpg",
    status: "published",
    created_at: new Date().toISOString(),
  },
  {
    id: "revision-majeure-reconditionnement-complet-overhaul-moteurs-diesel",
    title: "Révision majeure et reconditionnement complet (Overhaul) des moteurs diesel industriels",
    slug: "revision-majeure-reconditionnement-complet-overhaul-moteurs-diesel",
    category: "Groupes Électrogènes",
    excerpt: "Guide technique étape par étape sur le démontage, le métrologie, le chemisage, le rectification et le rodage des grands moteurs diesel (Cummins, Perkins, Caterpillar).",
    cover_url: "/og-preview.png",
    status: "published",
    created_at: new Date().toISOString(),
  },
  {
    id: "inverseurs-automatiques-source-ats-synchro-couplage-principes-schemas",
    title: "Inverseurs Automatiques de Source (ATS) et Synchro-Couplage : Principes, algorithmes et schémas de puissance",
    slug: "inverseurs-automatiques-source-ats-synchro-couplage-principes-schemas",
    category: "Armoires Électriques",
    excerpt: "Étude complète sur les technologies de permutation de sources d'énergie : transition ouverte, transition fermée, synchronisation et partage de charge.",
    cover_url: "/images/hero.jpg",
    status: "published",
    created_at: new Date().toISOString(),
  },
  {
    id: "audit-securite-electrique-mise-aux-normes-installations-grande-puissance",
    title: "Audit de sécurité électrique et mise aux normes des installations de grande puissance au Cameroun",
    slug: "audit-securite-electrique-mise-aux-normes-installations-grande-puissance",
    category: "Sécurité et Normes",
    excerpt: "Méthodologie complète pour auditer les réseaux électriques industriels, mesurer la terre, évaluer le risque incendie et se conformer à la norme NF C 15-100.",
    cover_url: "/og-preview.png",
    status: "published",
    created_at: new Date().toISOString(),
  }
]

export default function BlogPage() {
  return <BlogClient initialArticles={fallbackLongArticles} />
}
