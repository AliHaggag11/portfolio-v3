export interface Project {
  _id: string;
  company: string;
  year: string;
  title: string;
  results: string[];
  link: string;
  image: string;
}

export interface Testimonial {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  name: string;
  position: string;
  text: string;
  avatar: string;
}

export interface ToolboxItem {
  _id: string;
  title: string;
  icon: string;
}

export interface Hobby {
  _id: string;
  title: string;
  emoji: string;
  left: string;
  top: string;
}

export interface SiteSettings {
  _id: string;
  title: string;
  description: string;
  availableForWork: boolean;
}

export interface Career {
  _id: string;
  company: string;
  position: string;
  period: string;
  description: string[];
  order: number;
}

export interface CV {
  _id: string;
  title: string;
  file: string;
  lastUpdated: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  excerpt: string;
  mainImage?: string;
  content: any[];
  tags: string[];
}

export interface SocialLink {
  title: string;
  description: string;
  url: string;
  icon: 'whatsapp' | 'email' | 'linkedin' | 'github' | 'twitter' | 'instagram' | 'facebook' | 'youtube';
  gradient: {
    from: string;
    to: string;
  };
  order: number;
} 