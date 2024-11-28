import { client } from '@/sanity/config'
import { groq } from 'next-sanity'
import { Project, Testimonial, ToolboxItem, SiteSettings, Career, CV, BlogPost } from '@/types/sanity'

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
    const result = await client.fetch(query, {}, { 
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    console.log('Query result:', result);
    
    return result;
  } catch (error) {
    console.error('Error in getProjects:', error);
    throw error;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const query = groq`*[_type == "testimonial"] {
      _id,
      name,
      position,
      text,
      "avatar": avatar.asset->url
    }`
    
    console.log('Executing testimonials query:', query);
    const result = await client.fetch(query);
    console.log('Raw testimonials result:', result);
    
    if (!result) {
      console.warn('No result returned from Sanity');
      return [];
    }
    
    return result;
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

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const query = groq`*[_type == "siteSettings"][0] {
      _id,
      title,
      description,
      availableForWork
    }`
    
    console.log('Executing site settings query:', query)
    const result = await client.fetch(query, {}, { 
      cache: 'no-store',
      next: { revalidate: 0 }
    })
    console.log('Site settings result:', result)
    
    if (!result) {
      console.warn('No site settings found, using defaults')
      return {
        _id: '',
        title: 'Portfolio',
        description: 'My Portfolio Website',
        availableForWork: true
      }
    }
    
    return result
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return {
      _id: '',
      title: 'Portfolio',
      description: 'My Portfolio Website',
      availableForWork: true
    }
  }
}

export async function getCareers(): Promise<Career[]> {
  try {
    const query = groq`*[_type == "career"] | order(order asc) {
      _id,
      company,
      position,
      period,
      description,
      order
    }`
    
    console.log('Executing careers query:', query);
    const result = await client.fetch(query);
    console.log('Careers result:', result);
    
    if (!result) {
      console.warn('No careers found');
      return [];
    }
    
    return result;
  } catch (error) {
    console.error('Error in getCareers:', error);
    throw error;
  }
}

export async function getCV(): Promise<CV | null> {
  try {
    const query = groq`*[_type == "cv"][0] {
      _id,
      title,
      "file": file.asset->url,
      lastUpdated
    }`
    
    console.log('Executing CV query:', query);
    const result = await client.fetch(query);
    console.log('CV result:', result);
    return result;
  } catch (error) {
    console.error('Error fetching CV:', error);
    return null;
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const query = groq`*[_type == "blog"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      "mainImage": mainImage.asset->url,
      content,
      tags
    }`
    
    const result = await client.fetch(query);
    return result;
  } catch (error) {
    console.error('Error in getBlogPosts:', error);
    throw error;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
  try {
    const query = groq`*[_type == "blog" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      "mainImage": mainImage.asset->url,
      content,
      tags
    }`
    
    const result = await client.fetch(query, { slug });
    return result;
  } catch (error) {
    console.error('Error in getBlogPostBySlug:', error);
    throw error;
  }
} 