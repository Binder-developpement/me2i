import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/src/components/Layout";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://me2i.cm';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "MCI SARL : Maintenance et Construction Industrielle",
    template: "%s | MCI Cameroun",
  },
  description:
    "Expertise d'excellence au Cameroun en maintenance industrielle, groupes électrogènes, automatisme, armoires électriques et solutions d'énergie renouvelable 24h/7j.",
  keywords: [
    // Mots-clés Français
    "MCI",
    "maintenance industrielle",
    "maintenances industrielles",
    "maintenance de groupes électrogènes",
    "automatisme industriel",
    "armoires électriques industrielles",
    "onduleurs et systèmes UPS",
    "énergie sans interruption",
    "génie électrique Cameroun",
    "électromécanique industrielle",
    "dépannage groupe électrogène Douala Yaoundé",
    "hybridation solaire et groupe électrogène",
    "audit et expertise énergétique",

    // English Keywords
    "industrial maintenance",
    "industrial plant maintenance",
    "generator maintenance",
    "power generators services",
    "industrial automation",
    "uninterruptible power supply",
    "UPS systems maintenance",
    "electrical engineering Cameroon",
    "electromechanical services",
    "backup power systems",
    "industrial energy solutions",
    "power plant maintenance Africa"
  ],
  authors: [{ name: "MCI Maintenance et Énergie" }],
  creator: "MCI",
  publisher: "MCI",
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
    siteName: "MCI : Maintenance et Énergie",
    title: "MCI SARL : Maintenance et Construction Industrielle",
    description:
      "Spécialiste de la maintenance industrielle, des groupes électrogènes, de l'automatisme et des installations électriques au Cameroun.",
    images: [
      {
        url: `${baseUrl}/og-preview.png`,
        width: 1200,
        height: 630,
        alt: "MCI Maintenance Industrielle et Énergie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MCI SARL : Maintenance et Construction Industrielle",
    description:
      "Spécialiste de la maintenance industrielle, des groupes électrogènes, de l'automatisme et des installations électriques au Cameroun.",
    images: [`${baseUrl}/og-preview.png`],
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
    name: "MCI : Maintenance Industrielle & Énergie",
    url: baseUrl,
    logo: `${baseUrl}/og-preview.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+237 699 00 00 00",
      contactType: "customer service",
      areaServed: "CM",
      availableLanguage: ["French", "English"],
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
