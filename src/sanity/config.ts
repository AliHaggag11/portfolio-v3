import { createClient, ClientConfig } from 'next-sanity'
import { apiVersion, dataset, projectId, token } from './env'

export const config: ClientConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: token || '',
  perspective: 'published' as const,
  stega: {
    enabled: false
  }
}

// Create a client with basic configuration
export const client = createClient(config)

// Add logging in development
if (process.env.NODE_ENV === 'development') {
  console.log('Sanity Client Configuration:', {
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    perspective: 'published',
    hasToken: !!token
  })
} 