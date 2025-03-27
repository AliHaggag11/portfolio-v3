import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'linksPage',
  title: 'Links Page Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title/Role',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Based in Egypt • Available Worldwide',
    }),
    defineField({
      name: 'timezone',
      title: 'Timezone Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'GMT+2 (EET)',
    }),
    defineField({
      name: 'showAvailabilityStatus',
      title: 'Show Availability Status',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showAnnouncement',
      title: 'Show Announcement Banner',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'announcement',
      title: 'Announcement',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Announcement Text',
          type: 'string',
          validation: Rule => Rule.max(100).warning('Announcement should be concise')
        },
        {
          name: 'link',
          title: 'Link (Optional)',
          type: 'url',
          validation: Rule => Rule.uri({
            scheme: ['http', 'https']
          })
        },
        {
          name: 'textColor',
          title: 'Text Color',
          type: 'string',
          options: {
            list: [
              { title: 'Emerald', value: 'emerald' },
              { title: 'Sky', value: 'sky' },
              { title: 'White', value: 'white' },
            ]
          },
          initialValue: 'white'
        },
        {
          name: 'icon',
          title: 'Icon',
          type: 'string',
          options: {
            list: [
              { title: 'Star', value: 'star' },
              { title: 'Sparkle', value: 'sparkle' },
              { title: 'None', value: 'none' },
            ]
          },
          initialValue: 'star'
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'profileImage',
    },
  },
}); 