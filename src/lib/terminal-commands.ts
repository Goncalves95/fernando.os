import { getManualProjects } from "@/lib/projects";
import { TerminalCommand, TerminalCommandResult } from "@/types";

const HELP_LINES = [
  "Available commands:",
  "  help                        show this list",
  "  about                       who is Fernando?",
  "  skills                      list core technologies",
  "  skills --category=<name>    filter skills (java, frontend, ml, devops)",
  "  projects                    list featured projects",
  "  projects --filter=<tech>    filter projects by tech",
  "  contact                     show contact info",
  "  whoami                      who are you, really?",
  "  cd <dir>                    change directory",
  "  date                        print current date/time",
  "  echo [text]                 print text back",
  "  clear                       clear the terminal",
];

const SKILLS_BY_CATEGORY: Record<string, { label: string; items: string[] }> = {
  java: {
    label: "Java",
    items: ["Java 21", "Spring Boot", "Hibernate", "REST APIs", "Maven"],
  },
  frontend: {
    label: "Frontend",
    items: ["Angular", "React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  ml: {
    label: "ML/Data",
    items: ["Python", "XGBoost", "Prophet", "MLflow", "Streamlit"],
  },
  devops: {
    label: "DevOps",
    items: ["Docker", "GitHub Actions", "Azure", "GitLab CI"],
  },
};

function parseFlags(args: string[]): Record<string, string> {
  const flags: Record<string, string> = {};

  for (const arg of args) {
    const match = arg.match(/^--([\w-]+)=(.+)$/);
    if (match) flags[match[1]] = match[2];
  }

  return flags;
}

export const terminalCommands: TerminalCommand[] = [
  {
    name: "help",
    description: "List available commands",
    handler: (): TerminalCommandResult => ({ output: HELP_LINES }),
  },
  {
    name: "about",
    description: "About Fernando",
    handler: (): TerminalCommandResult => ({
      output: [
        "Fernando — Full Stack Software Engineer.",
        "Building products end to end: APIs, data, and the pixels on top.",
        "Type 'projects' or 'skills' to see more.",
      ],
    }),
  },
  {
    name: "skills",
    description: "List core technologies",
    handler: (args): TerminalCommandResult => {
      const { category } = parseFlags(args);

      if (!category) {
        return {
          output: Object.values(SKILLS_BY_CATEGORY).flatMap((group) => [
            `${group.label}:`,
            `  ${group.items.join(", ")}`,
          ]),
        };
      }

      const group = SKILLS_BY_CATEGORY[category.toLowerCase()];

      if (!group) {
        return {
          output: [
            `unknown category: ${category}`,
            `available categories: ${Object.keys(SKILLS_BY_CATEGORY).join(", ")}`,
          ],
        };
      }

      return { output: [`${group.label}:`, `  ${group.items.join(", ")}`] };
    },
  },
  {
    name: "projects",
    description: "List featured projects",
    handler: (args): TerminalCommandResult => {
      const { filter } = parseFlags(args);
      const projects = getManualProjects();

      const filtered = filter
        ? projects.filter((p) =>
            p.techs.some((tech) => tech.toLowerCase().includes(filter.toLowerCase())),
          )
        : projects;

      if (filtered.length === 0) {
        return { output: [`no projects match filter: ${filter}`] };
      }

      return {
        output: [
          filter ? `Projects matching "${filter}":` : "Featured projects:",
          ...filtered.map((p) => `  ${p.name.padEnd(24)} ${p.description}`),
        ],
      };
    },
  },
  {
    name: "contact",
    description: "Show contact info",
    handler: (): TerminalCommandResult => ({
      output: [
        "Email    : fernandojcg22@gmail.com",
        "GitHub   : https://github.com/Goncalves95",
        "LinkedIn : https://linkedin.com/in/fernando-goncalves",
      ],
    }),
  },
  {
    name: "whoami",
    description: "Print current user",
    handler: (): TerminalCommandResult => ({
      output: [
        "You're either a recruiter, a curious dev, or Fernando himself",
        "debugging his own portfolio at 2am. Either way — welcome.",
      ],
    }),
  },
  {
    name: "cd",
    description: "Change directory",
    handler: (args): TerminalCommandResult => {
      const target = args[0]?.toLowerCase();

      if (!target) {
        return { output: ["cd: missing operand"] };
      }

      if (target === "raigon") {
        return {
          output: [
            "Entering Raigon Lab...",
            "Access granted. This is where Fernando prototypes the ideas too",
            "weird for production: a neural net that picks tattoo designs,",
            "a CLI that argues back, and three abandoned crypto trackers.",
          ],
        };
      }

      return { output: [`cd: no such directory: ${target}`, "psst — try 'cd raigon'"] };
    },
  },
  {
    name: "date",
    description: "Print current date/time",
    handler: (): TerminalCommandResult => ({ output: [new Date().toString()] }),
  },
  {
    name: "echo",
    description: "Print text back",
    handler: (args): TerminalCommandResult => ({ output: [args.join(" ")] }),
  },
  {
    name: "clear",
    description: "Clear the terminal",
    handler: (): TerminalCommandResult => ({ output: [], clear: true }),
  },
];

export function findCommand(name: string): TerminalCommand | undefined {
  return terminalCommands.find((command) => command.name === name.toLowerCase());
}

export async function runTerminalCommand(input: string): Promise<TerminalCommandResult> {
  const trimmed = input.trim();

  if (!trimmed) {
    return { output: [] };
  }

  const [name, ...args] = trimmed.split(/\s+/);
  const command = findCommand(name);

  if (!command) {
    return {
      output: [`command not found: ${name}. Type 'help' for available commands.`],
    };
  }

  return command.handler(args);
}
