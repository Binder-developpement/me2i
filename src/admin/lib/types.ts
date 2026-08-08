export type ArticleStatus = 'draft' | 'published' | 'archived'
export type ServiceStatus = 'published' | 'draft'
export type ProductStatus = 'published' | 'draft' | 'out_of_stock'
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled'
export type ContactStatus = 'unread' | 'read' | 'replied' | 'archived'

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  cover_url: string | null
  category: string | null
  status: ArticleStatus
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  title: string
  slug: string
  description: string | null
  content: string | null
  icon_name: string | null
  cover_url: string | null
  category: string | null
  order_index: number
  status: ServiceStatus
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: number | null
  currency: string
  cover_url: string | null
  images: string[]
  category: string | null
  stock: number
  status: ProductStatus
  created_at: string
  updated_at: string
}

export interface OrderItem {
  product_id: string
  name: string
  qty: number
  price: number
}

export interface Order {
  id: string
  reference: string
  customer_name: string
  customer_email: string
  customer_phone: string | null
  items: OrderItem[]
  total: number | null
  currency: string
  status: OrderStatus
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Contact {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string
  status: ContactStatus
  created_at: string
}

export interface CompanySetting {
  id: string
  key: string
  value: string | null
  updated_at: string
}
