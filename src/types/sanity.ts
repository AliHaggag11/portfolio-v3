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