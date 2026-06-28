export type LineTone = "default" | "accent" | "success";

export interface LineSegment {
  text: string;
  tone?: LineTone;
}

export interface BootLine {
  segments: LineSegment[];
  startMs: number;
}

const CHECK = "✓";

export const CHAR_MS = 12;
export const HOLD_AFTER_LAST_LINE_MS = 800;

export const DESKTOP_LINES: BootLine[] = [
  {
    startMs: 0,
    segments: [
      { text: "> Initializing " },
      { text: "Fernando OS", tone: "accent" },
      { text: " v2.0..." },
    ],
  },
  {
    startMs: 600,
    segments: [
      { text: "> Loading runtime: Java " },
      { text: CHECK, tone: "success" },
      { text: "  Spring Boot " },
      { text: CHECK, tone: "success" },
      { text: "  Angular " },
      { text: CHECK, tone: "success" },
    ],
  },
  {
    startMs: 1200,
    segments: [
      { text: "> Loading ML stack: Python " },
      { text: CHECK, tone: "success" },
      { text: "  XGBoost " },
      { text: CHECK, tone: "success" },
      { text: "  MLflow " },
      { text: CHECK, tone: "success" },
    ],
  },
  {
    startMs: 1800,
    segments: [
      { text: "> Connecting to GitHub API... " },
      { text: CHECK, tone: "success" },
    ],
  },
  {
    startMs: 2400,
    segments: [{ text: "> Welcome, Recruiter. All systems operational." }],
  },
];

export const MOBILE_LINES: BootLine[] = [
  {
    startMs: 0,
    segments: [
      { text: "> Initializing " },
      { text: "Fernando OS", tone: "accent" },
      { text: " v2.0..." },
    ],
  },
  {
    startMs: 600,
    segments: [
      { text: "> Loading stack: Java " },
      { text: CHECK, tone: "success" },
      { text: "  Python " },
      { text: CHECK, tone: "success" },
    ],
  },
  {
    startMs: 1200,
    segments: [{ text: "> Welcome, Recruiter. Systems operational." }],
  },
];

export function getExitMs(lines: BootLine[]): number {
  const lastLine = lines[lines.length - 1];
  return lastLine.startMs + HOLD_AFTER_LAST_LINE_MS;
}
