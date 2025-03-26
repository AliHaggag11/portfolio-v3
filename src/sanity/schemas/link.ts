import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'link',
  title: 'Social Link',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      validation: (Rule) => Rule.required().custom((value: string | undefined) => {
        if (!value) return 'URL is required';
        const pattern = /^(https?:\/\/|mailto:|tel:|sms:|whatsapp:)/;
        if (!pattern.test(value)) {
          return 'URL must start with http://, https://, mailto:, tel:, sms:, or whatsapp:';
        }
        return true;
      }),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'WhatsApp', value: 'whatsapp' },
          { title: 'Email', value: 'email' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'GitHub', value: 'github' },
          { title: 'Twitter', value: 'twitter' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'YouTube', value: 'youtube' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gradient',
      title: 'Gradient',
      type: 'object',
      fields: [
        {
          name: 'from',
          title: 'From Color',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'to',
          title: 'To Color',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'url',
    },
  },
}); 