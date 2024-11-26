export default {
  name: 'hobby',
  title: 'Hobby',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'emoji',
      title: 'Emoji',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'left',
      title: 'Left Position',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'top',
      title: 'Top Position',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
  ],
} 