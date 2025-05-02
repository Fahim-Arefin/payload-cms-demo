import { Block } from 'payload'

export const ServicesOverviewBlock: Block = {
  slug: 'services-overview',
  labels: {
    singular: 'Services Overview',
    plural: 'Services Overview',
  },
  fields: [
    {
      name: 'heading',
      label: 'Section Heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Intro Description',
      type: 'textarea',
    },
    {
      name: 'services',
      label: 'Web Development Services',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Service Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Service Description',
          required: true,
        },
        {
          name: 'image',
          label: 'Service Image',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
      ],
    },
  ],
}
