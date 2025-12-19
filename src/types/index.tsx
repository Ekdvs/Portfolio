export interface Project {
  id: number;
  title: string;
  tech: string;
  description: string;
  image: string[];
  liveLink: string;
  githubLink: string | string[];
  category: 'web' | 'mobile' | 'fullstack';
}

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'database' | 'tools';
}

export interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}