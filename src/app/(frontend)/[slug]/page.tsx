import React, { cache } from 'react'

import config from '@/payload.config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import { Page } from '@/payload-types'
import HeroBlock from '@/blocks/Hero/HeroBlock'
import ContactUsFormBlock from '@/blocks/contactUsForm/ContactUsFormBlock'
import ServicesOverviewBlock from '@/blocks/servicesOverview/ServicesOverviewBlock'

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const parsedSlug = decodeURIComponent(slug)

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'pages',
    limit: 1,
    where: {
      slug: {
        equals: parsedSlug,
      },
    },
  })

  return result.docs?.[0] || null
})

export async function generateStaticParams() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
  })

  return pages.docs
    ?.filter((doc) => doc.slug !== 'index')
    .map((doc) => ({
      params: { slug: doc.slug },
    }))
}

async function page({ params: { slug = 'index' } }) {
  const page = await queryPageBySlug({ slug })

  if (!page) {
    return notFound()
  }

  console.log('page', page)

  const renderBlocks = (block: Page['layout'][0]) => {
    switch (block.blockType) {
      case 'hero':
        return <HeroBlock block={block} key={block.id} />
      case 'contact-us-form':
        return <ContactUsFormBlock block={block} key={block.id} />
      case 'services-overview':
        return <ServicesOverviewBlock block={block} key={block.id} />

      default:
        return null
    }
  }

  return <div>{page.layout?.map((block) => renderBlocks(block))}</div>
}

export default page
