export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'availableForWork',
      title: 'Available for Work',
      type: 'boolean',
      initialValue: true,
    },
  ],
} 