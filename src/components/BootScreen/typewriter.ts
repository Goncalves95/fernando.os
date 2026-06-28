import { BootLine, LineTone } from "./boot-lines";

export interface ToneRun {
  text: string;
  tone: LineTone;
}

/** Splits a line's segments into per-character tone tags, then groups the
 * revealed prefix back into contiguous runs so we render one span per run
 * instead of one per character. */
export function getRevealedRuns(line: BootLine, elapsedMs: number, charMs: number): ToneRun[] {
  const chars: { char: string; tone: LineTone }[] = [];

  for (const segment of line.segments) {
    const tone = segment.tone ?? "default";
    for (const char of segment.text) {
      chars.push({ char, tone });
    }
  }

  const revealedCount = Math.max(
    0,
    Math.min(chars.length, Math.floor((elapsedMs - line.startMs) / charMs)),
  );

  const runs: ToneRun[] = [];

  for (let i = 0; i < revealedCount; i += 1) {
    const { char, tone } = chars[i];
    const lastRun = runs[runs.length - 1];

    if (lastRun && lastRun.tone === tone) {
      lastRun.text += char;
    } else {
      runs.push({ text: char, tone });
    }
  }

  return runs;
}

export function getLineLength(line: BootLine): number {
  return line.segments.reduce((sum, segment) => sum + segment.text.length, 0);
}

export function isLineFullyTyped(line: BootLine, elapsedMs: number, charMs: number): boolean {
  return elapsedMs - line.startMs >= getLineLength(line) * charMs;
}
