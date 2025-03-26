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
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'profileImage',
    },
  },
}); 