import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schema } from './src/sanity/schemas'
import { apiVersion, dataset, projectId } from './src/sanity/env'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Portfolio CMS',
  schema,
  plugins: [
    deskTool(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    // Prevent the studio from crashing on image upload issues
    actions: (prev) => prev.filter((action) => action.action !== 'restore'),
  },
}) 