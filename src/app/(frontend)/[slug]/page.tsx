// ✅ Add this at the top of the file (outside the function)
export const dynamic = 'force-dynamic'
import React, { cache } from 'react'

import config from '@/payload.config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import HeroBlock from '@/blocks/Hero/HeroBlock'
import ContactUsFormBlock from '@/blocks/contactUsForm/ContactUsFormBlock'
import ServicesOverviewBlock from '@/blocks/servicesOverview/ServicesOverviewBlock'
import { Page as PayloadPage } from '@/payload-types'
import { renderPageContent } from '@/components/PageContent'

export const queryPageBySlug = async ({ slug }: { slug: string }) => {
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
}

// export async function generateStaticParams() {
//   const payloadConfig = await config
//   const payload = await getPayload({ config: payloadConfig })

//   const pages = await payload.find({
//     collection: 'pages',
//     draft: false,
//     limit: 1000,
//   })

//   return pages.docs
//     ?.filter((doc) => doc.slug !== 'index')
//     .map((doc) => ({
//       params: { slug: doc.slug },
//     }))
// }

// @ts-ignore
async function Page({ params }: { params: { slug?: string } }) {
  const slug = params.slug ?? 'index'
  const page = await queryPageBySlug({ slug })

  if (!page) {
    return notFound()
  }

  console.log('page', page)

  // const renderBlocks = (block: PayloadPage['layout'][0]) => {
  //   switch (block.blockType) {
  //     case 'hero':
  //       return <HeroBlock block={block} key={block.id} />
  //     case 'contact-us-form':
  //       return <ContactUsFormBlock block={block} key={block.id} />
  //     case 'services-overview':
  //       return <ServicesOverviewBlock block={block} key={block.id} />

  //     default:
  //       return null
  //   }
  // }

  // return <div>{page.layout?.map((block) => renderBlocks(block))}</div>
  return renderPageContent(page)
}

export default Page
