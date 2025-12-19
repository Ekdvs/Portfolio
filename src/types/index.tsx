// src/types/index.ts
import type { LucideIcon } from 'lucide-react';
import type {  ElementType } from 'react';

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
  icon: LucideIcon; // ✅ type-only import
  title: string;
  description: string;
}

// Contact form structure
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Social links: use ElementType for React component icons
export interface SocialLink {
  name: string;
  url: string;
  icon: ElementType; // ✅ React component like LucideIcon
}
