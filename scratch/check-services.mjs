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

async function checkServices() {
  const { data: services, error } = await supabase
    .from('services')
    .select('*')
    .order('order_index', { ascending: true })

  console.log('--- SUPABASE SERVICES ---')
  if (error) {
    console.error('Error fetching services:', error.message)
  } else {
    console.log(`Total rows: ${services?.length}`)
    services?.forEach((s) => {
      console.log(`- Slug: ${s.slug} | Title: ${s.title} | Category: ${s.category}`)
      console.log(`  Description: ${s.description}`)
    })
  }
}

checkServices()
