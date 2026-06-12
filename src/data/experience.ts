import type { Experience } from "../types";

export const experience: Experience[] = [
  {
    id: 1,
    role: 'Software Engineer Intern',
    company: 'Aztra (Pvt) Ltd',
    type: 'Internship',
    startDate: '27 April 2026',
    endDate: null,
    location: 'Remote',
    mode: 'Remote / Virtual',
    current: true,
    description: [
      'Working on full-stack development tasks and real-world production features.',
      'Collaborating with team members in an Agile environment.',
      'Participating in code reviews and improving application performance.',
    ],
  },
  {
    id: 2,
    role: 'Full Stack Development Intern',
    company: 'Decode Labs',
    type: 'Internship',
    startDate: '7 June 2026',
    endDate: '7 July 2026',
    location: 'Remote',
    mode: 'Remote / Virtual',
    current: false,
    description: [
      'Worked on assigned full-stack projects and milestone-based development.',
      'Participated in mentor-led sessions and training programs.',
      'Gained hands-on experience in real-world development workflow.',
    ],
  },
];