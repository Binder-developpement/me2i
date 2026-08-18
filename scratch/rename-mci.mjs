import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const filesToRename = [
  '.agents/AGENTS.md',
  'app/a-propos/page.tsx',
  'app/admin/contacts/[id]/ContactDetailClient.tsx',
  'app/admin/layout.tsx',
  'app/admin/login/page.tsx',
  'app/admin/media/page.tsx',
  'app/admin/page.tsx',
  'app/admin/parametres/CompanySettingsClient.tsx',
  'app/admin/utilisateurs/UserListClient.tsx',
  'app/api/seed-articles/route.ts',
  'app/blog/[id]/page.tsx',
  'app/blog/page.tsx',
  'app/contact/page.tsx',
  'app/layout.tsx',
  'app/page.tsx',
  'app/realisations/[id]/page.tsx',
  'app/realisations/page.tsx',
  'app/services/page.tsx',
  'src/admin/components/AdminSidebar.tsx',
  'src/admin/lib/user-actions.ts',
  'src/components/Footer.tsx',
  'src/components/Navbar.tsx',
  'src/lib/default-articles.ts',
  'src/lib/realisations-data.ts',
  'src/site-pages/About.tsx',
  'src/site-pages/BlogClient.tsx',
  'src/site-pages/Contact.tsx',
  'src/site-pages/Home.tsx',
  'src/site-pages/OrderClient.tsx',
  'src/site-pages/ProductsClient.tsx',
  'src/site-pages/RealisationDetail.tsx',
  'src/site-pages/Realisations.tsx',
  'src/site-pages/ServicesClient.tsx',
  'supabase/schema.sql'
];

// Additional files with em-dash to process
const emDashFiles = [
  'app/admin/realisations/RealisationListClient.tsx',
  'app/admin/articles/ArticleListClient.tsx'
];

const allFiles = Array.from(new Set([...filesToRename, ...emDashFiles]));

console.log(`Starting migration to rename ME2I to MCI and clean up typographic em-dashes...`);

allFiles.forEach(relPath => {
  const filePath = path.join(rootDir, relPath);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ File not found: ${relPath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Replace ME2I with MCI
  content = content.replace(/ME2I/g, 'MCI');

  // 2. Replace prohibited em-dash (—) with simple hyphen (-) in UI files
  if (
    relPath.includes('schema.sql') ||
    relPath.includes('page.tsx') ||
    relPath.includes('Client.tsx')
  ) {
    content = content.replace(/—/g, '-');
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Processed: ${relPath}`);
  } else {
    console.log(`  No changes needed: ${relPath}`);
  }
});

console.log(`Migration completed successfully!`);
