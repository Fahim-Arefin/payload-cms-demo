import { ContactUsForm } from '@/blocks/contactUsForm/schema'
import { HeroBlock } from '@/blocks/Hero/schema'
import { ServicesOverviewBlock } from '@/blocks/servicesOverview/schema'
import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      required: true,
    },
    {
      name: 'layout',
      label: 'Layout',
      type: 'blocks',
      required: true,
      blocks: [HeroBlock, ContactUsForm, ServicesOverviewBlock],
    },
  ],
}
