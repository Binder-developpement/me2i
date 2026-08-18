import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const filesToUpdate = [
  'supabase/schema.sql',
  'src/site-pages/Home.tsx',
  'src/site-pages/About.tsx',
  'src/components/Footer.tsx',
  'app/page.tsx',
  'app/layout.tsx',
  'app/contact/page.tsx',
  'app/blog/[id]/page.tsx',
  'app/admin/parametres/CompanySettingsClient.tsx',
  'app/a-propos/page.tsx'
];

console.log('1. Starting replacement in local files...');

filesToUpdate.forEach(relPath => {
  const filePath = path.join(rootDir, relPath);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ File not found: ${relPath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replacements
  content = content.replace(/MCI \(Maintenance Industrielle et Énergie sans Interruption\)/g, 'MCI SARL (Maintenance et Construction Industrielle)');
  content = content.replace(/MCI \(Maintenance Industrielle & Énergie sans Interruption\)/g, 'MCI SARL (Maintenance & Construction Industrielle)');
  content = content.replace(/MCI : Maintenance Industrielle & Énergie sans Interruption/g, 'MCI SARL : Maintenance et Construction Industrielle');
  content = content.replace(/MCI : Maintenance Industrielle et Énergie sans Interruption/g, 'MCI SARL : Maintenance et Construction Industrielle');
  
  // Tagline occurrences
  content = content.replace(/Maintenance Industrielle & Énergie sans Interruption/g, 'Maintenance & Construction Industrielle');
  content = content.replace(/Maintenance Industrielle et Énergie sans Interruption/g, 'Maintenance et Construction Industrielle');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Updated: ${relPath}`);
  } else {
    console.log(`  No changes needed in: ${relPath}`);
  }
});

// 2. Database update
console.log('\n2. Starting database update for tagline in Supabase...');

const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach((line) => {
    const parts = line.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
      if (key && !process.env[key]) {
        process.env[key] = val;
      }
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials missing in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function updateDb() {
  console.log('Logging in as dev@me2i.cm...');
  let authData = null;
  let authError = null;

  try {
    const res = await supabase.auth.signInWithPassword({
      email: 'dev@me2i.cm',
      password: 'Password123!',
    });
    authData = res.data;
    authError = res.error;
  } catch (err) {
    authError = err;
  }

  if (authError || !authData?.session) {
    console.warn('Could not log in as dev@me2i.cm, trying dev@mci.cm...');
    try {
      const res = await supabase.auth.signInWithPassword({
        email: 'dev@mci.cm',
        password: 'Password123!',
      });
      authData = res.data;
      authError = res.error;
    } catch (err) {
      authError = err;
    }
  }

  if (authError || !authData?.session) {
    console.error('Authentication failed:', authError?.message || authError);
    process.exit(1);
  }

  console.log('Updating key "tagline" in company_settings...');
  const { error } = await supabase
    .from('company_settings')
    .upsert(
      { key: 'tagline', value: 'Maintenance & Construction Industrielle', updated_at: new Date().toISOString() },
      { onConflict: 'key' }
    );

  if (error) {
    console.error('Error updating tagline in DB:', error.message);
  } else {
    console.log('✓ Successfully updated database tagline!');
  }
}

updateDb();
