import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/src/components/Layout";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://me2i.cm';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "ME2I — Maintenance Industrielle & Énergie sans Interruption",
    template: "%s | ME2I Cameroun",
  },
  description:
    "Expertise au Cameroun en maintenance industrielle, groupes électrogènes, automatisme, armoires électriques et solutions d'énergie renouvelable 24h/7j.",
  keywords: [
    "ME2I",
    "Maintenance industrielle Cameroun",
    "Groupes électrogènes Douala Yaoundé",
    "Automatisme industriel",
    "Onduleurs et énergie solaire",
    "Armoires électriques",
    "Énergie sans interruption",
  ],
  authors: [{ name: "ME2I Maintenance et Énergie" }],
  creator: "ME2I",
  publisher: "ME2I",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: baseUrl,
    siteName: "ME2I - Maintenance et Énergie",
    title: "ME2I — Maintenance Industrielle & Énergie sans Interruption",
    description:
      "Spécialiste de la maintenance des groupes électrogènes, automatisme et installations électriques industrielles au Cameroun.",
    images: [
      {
        url: `${baseUrl}/images/hero.jpg`,
        width: 1200,
        height: 630,
        alt: "ME2I Maintenance et Énergie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ME2I — Maintenance Industrielle & Énergie sans Interruption",
    description:
      "Spécialiste de la maintenance des groupes électrogènes, automatisme et installations électriques industrielles au Cameroun.",
    images: [`${baseUrl}/images/hero.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ME2I - Maintenance Industrielle & Énergie",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+237 699 00 00 00",
      contactType: "customer service",
      areaServed: "CM",
      availableLanguage: "French",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "CM",
      addressLocality: "Douala",
    },
  };

  return (
    <html lang="fr" className="h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
