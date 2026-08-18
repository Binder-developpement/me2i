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

async function runUpdate() {
  console.log('Logging in as dev@me2i.cm to update settings...')
  let authData = null
  let authError = null

  // Try logging in with the old email first
  try {
    const res = await supabase.auth.signInWithPassword({
      email: 'dev@me2i.cm',
      password: 'Password123!',
    })
    authData = res.data
    authError = res.error
  } catch (err) {
    authError = err
  }

  // If that fails, try the new email
  if (authError || !authData?.session) {
    console.warn('Could not log in as dev@me2i.cm, trying dev@mci.cm...')
    try {
      const res = await supabase.auth.signInWithPassword({
        email: 'dev@mci.cm',
        password: 'Password123!',
      })
      authData = res.data
      authError = res.error
    } catch (err) {
      authError = err
    }
  }

  if (authError || !authData?.session) {
    console.error('Authentication failed completely:', authError?.message || authError)
    process.exit(1)
  }

  console.log('✓ Successfully authenticated!')

  // 1. Update company settings
  const settingsToUpsert = [
    { key: 'company_name', value: 'MCI' },
    { key: 'tagline', value: 'Maintenance & Construction Industrielle' },
    { key: 'email', value: 'contact@mci-sarl.com' },
    { key: 'phone', value: '+237 691 32 83 09' },
    { key: 'emergency_phone', value: '+237 683 08 30 18' },
    { key: 'address', value: 'Douala, Akwa-Ngodi, Cameroun' }
  ]

  console.log('Updating company_settings table...')
  for (const s of settingsToUpsert) {
    const { error } = await supabase
      .from('company_settings')
      .upsert({ key: s.key, value: s.value, updated_at: new Date().toISOString() }, { onConflict: 'key' })

    if (error) {
      console.error(`Error updating setting ${s.key}:`, error.message)
    } else {
      console.log(`✓ Setting updated: ${s.key} -> ${s.value}`)
    }
  }

  // 2. Update existing services descriptions and titles containing ME2I
  console.log('Checking services table for ME2I strings...')
  const { data: services, error: sErr } = await supabase.from('services').select('*')
  if (services) {
    for (const service of services) {
      let updated = false
      let newTitle = service.title
      let newDesc = service.description
      let newContent = service.content

      if (service.title?.includes('ME2I')) {
        newTitle = service.title.replace(/ME2I/g, 'MCI')
        updated = true
      }
      if (service.description?.includes('ME2I')) {
        newDesc = service.description.replace(/ME2I/g, 'MCI')
        updated = true
      }
      if (service.content?.includes('ME2I')) {
        newContent = service.content.replace(/ME2I/g, 'MCI')
        updated = true
      }

      if (updated) {
        const { error } = await supabase
          .from('services')
          .update({ title: newTitle, description: newDesc, content: newContent })
          .eq('id', service.id)

        if (error) {
          console.error(`Error updating service ${service.title}:`, error.message)
        } else {
          console.log(`✓ Updated service strings for: ${service.title}`)
        }
      }
    }
  }

  // 3. Update existing articles containing ME2I
  console.log('Checking articles table for ME2I strings...')
  const { data: articles, error: aErr } = await supabase.from('articles').select('*')
  if (articles) {
    for (const art of articles) {
      let updated = false
      let newTitle = art.title
      let newExcerpt = art.excerpt
      let newContent = art.content

      if (art.title?.includes('ME2I')) {
        newTitle = art.title.replace(/ME2I/g, 'MCI')
        updated = true
      }
      if (art.excerpt?.includes('ME2I')) {
        newExcerpt = art.excerpt.replace(/ME2I/g, 'MCI')
        updated = true
      }
      if (art.content?.includes('ME2I')) {
        newContent = art.content.replace(/ME2I/g, 'MCI')
        updated = true
      }

      if (updated) {
        const { error } = await supabase
          .from('articles')
          .update({ title: newTitle, excerpt: newExcerpt, content: newContent })
          .eq('id', art.id)

        if (error) {
          console.error(`Error updating article ${art.title}:`, error.message)
        } else {
          console.log(`✓ Updated article strings for: ${art.title}`)
        }
      }
    }
  }

  console.log('Database updates completed successfully!')
}

runUpdate()
