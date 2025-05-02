import { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      required: true,
    },
    {
      name: 'subheading',
      label: 'Subheading',
      type: 'richText',
      required: true,
    },
    {
      name: 'image',
      label: 'Banner Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
