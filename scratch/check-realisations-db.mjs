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

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function checkRealisations() {
  console.log('Logging in as dev@me2i.cm to check realisations...')
  const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
    email: 'dev@me2i.cm',
    password: 'Password123!',
  })

  if (authErr || !authData?.session) {
    console.error('Authentication failed:', authErr?.message)
    process.exit(1)
  }

  const { data: realisations, error } = await supabase.from('realisations').select('*')
  if (error) {
    console.error('Error fetching realisations:', error.message)
    return
  }

  console.log(`Total realisations found: ${realisations?.length}`)
  for (const rel of realisations || []) {
    let updated = false
    let newTitle = rel.title
    let newSubtitle = rel.subtitle
    let newDesc = rel.description
    let newContent = rel.content

    if (rel.title?.includes('ME2I')) {
      newTitle = rel.title.replace(/ME2I/g, 'MCI')
      updated = true
    }
    if (rel.subtitle?.includes('ME2I')) {
      newSubtitle = rel.subtitle.replace(/ME2I/g, 'MCI')
      updated = true
    }
    if (rel.description?.includes('ME2I')) {
      newDesc = rel.description.replace(/ME2I/g, 'MCI')
      updated = true
    }
    if (rel.content?.includes('ME2I')) {
      newContent = rel.content.replace(/ME2I/g, 'MCI')
      updated = true
    }

    if (updated) {
      const { error: uErr } = await supabase
        .from('realisations')
        .update({ title: newTitle, subtitle: newSubtitle, description: newDesc, content: newContent })
        .eq('id', rel.id)

      if (uErr) {
        console.error(`Error updating realisation ${rel.title}:`, uErr.message)
      } else {
        console.log(`✓ Updated strings in realisation: ${rel.title}`)
      }
    }
  }
}

checkRealisations()
