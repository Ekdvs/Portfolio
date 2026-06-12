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
  icon: LucideIcon; // 
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


export interface SocialLink {
  name: string;
  url: string;
  icon: ElementType; // ✅ React component like LucideIcon
}


export interface Certificate {
  id: number;
  name: string;
  issuer: string;
  date: string;
  status: 'done' | 'progress';
  tags: string[];
  url?: string | null;         // verify / show credential link
  credentialId?: string | null;
  expires?: string | null;
  image?: string | null;       // optional screenshot of the cert
  description?: string | null; // optional extra detail
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  type: string; // Internship / Full-time / Remote etc
  startDate: string;
  endDate: string | null;
  location?: string;
  mode?: string;
  current?: boolean;
  description?: string[];
}