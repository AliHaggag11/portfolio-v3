import { SchemaTypeDefinition } from 'sanity'
import project from './project'
import testimonial from './testimonial'
import toolboxItem from './toolboxItem'
import hobby from './hobby'
import siteSettings from './siteSettings'
import career from './career'
import cv from './cv'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, testimonial, toolboxItem, hobby, siteSettings, career, cv],
} 