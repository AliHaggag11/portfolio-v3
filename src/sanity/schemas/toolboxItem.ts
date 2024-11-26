export default {
  name: 'toolboxItem',
  title: 'Toolbox Item',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'React', value: 'react' },
          { title: 'Chrome', value: 'chrome' },
          { title: 'Github', value: 'github' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
  ],
} 