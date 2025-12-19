
import { AwardIcon, Briefcase, Code } from 'lucide-react';
import type { Service } from '../types';


export const services: Service[] = [
  {
    icon: Code,
    title: "Full-Stack Development",
    description: "End-to-end web applications with React, Node.js, Spring Boot, and modern databases."
  },
  {
    icon: Briefcase,
    title: "API Development",
    description: "RESTful APIs, real-time features with Socket.io, JWT authentication, and cloud deployment."
  },
  {
    icon: AwardIcon,
    title: "Technical Consulting",
    description: "Architecture design, code reviews, performance optimization, and best practices implementation."
  }
];