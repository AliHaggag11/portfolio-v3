import { client } from '@/sanity/config'
import { groq } from 'next-sanity'
import { Project, Testimonial, ToolboxItem } from '@/types/sanity'

export async function getProjects(): Promise<Project[]> {
  try {
    const query = groq`*[_type == "project"] | order(year desc) {
      _id,
      company,
      year,
      title,
      results,
      link,
      "image": image.asset->url
    }`
    
    console.log('Executing query:', query);
    const result = await client.fetch(query);
    console.log('Query result:', result);
    
    return result;
  } catch (error) {
    console.error('Error in getProjects:', error);
    throw error;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    return client.fetch(
      groq`*[_type == "testimonial"] {
        _id,
        name,
        position,
        text,
        "avatar": avatar.asset->url
      }`
    )
  } catch (error) {
    console.error('Error in getTestimonials:', error);
    throw error;
  }
}

export async function getToolboxItems(): Promise<ToolboxItem[]> {
  try {
    return client.fetch(
      groq`*[_type == "toolboxItem"] {
        _id,
        title,
        icon
      }`
    )
  } catch (error) {
    console.error('Error in getToolboxItems:', error);
    throw error;
  }
} 