import { projects } from "../data/projects";


export function searchProjects(query: string) {
  const q = query.toLowerCase();

  return projects.filter((p) => {
    return (
      p.title.toLowerCase().includes(q) ||
      p.tech.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });
}