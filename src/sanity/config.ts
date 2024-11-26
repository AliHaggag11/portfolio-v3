import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn } from './env'

const config = {
  projectId,
  dataset,
  apiVersion,
  useCdn,
}

export const client = createClient(config)
export { config } 