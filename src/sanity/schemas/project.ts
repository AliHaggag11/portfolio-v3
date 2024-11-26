export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'results',
      title: 'Results',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'link',
      title: 'Project URL',
      type: 'url',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
  ],
} 