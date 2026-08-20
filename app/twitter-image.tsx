import Image, { size, contentType, alt } from './opengraph-image'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 3600

export { size, contentType, alt }
export default Image
