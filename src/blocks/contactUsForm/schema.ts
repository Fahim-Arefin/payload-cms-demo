import { Block } from 'payload'

export const ContactUsForm: Block = {
  slug: 'contact-us-form',
  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      required: false,
    },

    {
      name: 'form',
      label: 'Contact Us Form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
  ],
}
