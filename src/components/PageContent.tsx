import { notFound } from 'next/navigation'
import { Page as PayloadPage } from '@/payload-types'
import HeroBlock from '@/blocks/Hero/HeroBlock'
import ContactUsFormBlock from '@/blocks/contactUsForm/ContactUsFormBlock'
import ServicesOverviewBlock from '@/blocks/servicesOverview/ServicesOverviewBlock'

export async function renderPageContent(page: PayloadPage) {
  const renderBlocks = (block: PayloadPage['layout'][0]) => {
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

  return <div>{page.layout?.map(renderBlocks)}</div>
}
