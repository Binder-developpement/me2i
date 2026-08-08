import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/src/components/Layout";

export const metadata: Metadata = {
  title: "Portail Institutionnel - Ville de Saint-Etienne",
  description: "Site officiel de la Ville de Saint-Etienne - Services, démarches et actualités.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
