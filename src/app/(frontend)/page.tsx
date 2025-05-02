export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { queryPageBySlug } from './[slug]/page'
import { renderPageContent } from '@/components/PageContent'

export default async function HomePage() {
  const page = await queryPageBySlug({ slug: 'index' })
  if (!page) return notFound()
  return renderPageContent(page)
}
