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

async function checkArticles() {
  const { data: articles, error } = await supabase
    .from('articles')
    .select('id, title, slug, status, cover_url')
    .order('created_at', { ascending: false })

  console.log('--- SUPABASE ARTICLES TABLE ROWS ---')
  if (error) {
    console.error('Error fetching articles:', error.message)
  } else {
    console.log(`Total rows in 'articles' table: ${articles?.length}`)
    articles?.forEach((a, i) => {
      console.log(`${i + 1}. [${a.id}] (slug: ${a.slug}) - ${a.title}`)
      console.log(`   Cover: ${a.cover_url} | Status: ${a.status}`)
    })
  }
}

checkArticles()
