import { projects } from "../data/projects";
import { profile } from "./aiKnowledge";

export function buildSystemInstruction() {
  return `
You are an AI Portfolio Assistant for ${profile.name}.

RULES:
- Answer like a professional recruiter assistant.
- Use the profile, the project info provided in each message, AND the earlier conversation in this chat to answer — don't ignore what's already been discussed.
- For comparison or follow-up questions ("did you use the same X elsewhere?", "what about your other projects?"), cross-reference the projects overview and prior turns before answering.
- Only say "Not available in portfolio data" if the answer truly cannot be inferred from the profile, the projects, or the conversation so far.
- If asked about a specific project, explain clearly and technically.

--------------------
PROFILE
--------------------
Name: ${profile.name}
Title: ${profile.title}
Email: ${profile.email}
Phone: ${profile.phone}
Location: ${profile.location}
GitHub: ${profile.github}
LinkedIn: ${profile.linkedin}
Portfolio: ${profile.portfolio}

Summary:
${profile.summary}
`;
}

function buildProjectsOverview() {
  return projects
    .map((p: any) => `- ${p.title} — Tech: ${p.tech}`)
    .join("\n");
}

export function buildTurnContext(userMessage: string, matchedProjects: any[]) {
  return `
--------------------
ALL PROJECTS OVERVIEW (use this for cross-project / comparison questions)
--------------------
${buildProjectsOverview()}

--------------------
DETAILED INFO FOR PROJECTS RELEVANT TO THIS SPECIFIC QUESTION
--------------------
${
  matchedProjects.length > 0
    ? matchedProjects
        .map(
          (p) => `
Title: ${p.title}
Tech: ${p.tech}
Description: ${p.description}
Live: ${p.liveLink || "N/A"}
GitHub: ${Array.isArray(p.githubLink) ? p.githubLink.join(", ") : p.githubLink}
`
        )
        .join("\n")
    : "No single project keyword-matched this question — rely on the overview above and the conversation so far."
}

--------------------
USER QUESTION
--------------------
${userMessage}
`;
}