"use client";

import { useEffect, useRef, useState } from "react";
import { runTerminalCommand, terminalCommands } from "@/lib/terminal-commands";
import { TerminalHistoryEntry } from "@/types";

const WELCOME_LINES = ["fernando-os terminal — type 'help' to get started"];

function Prompt() {
  return (
    <span className="shrink-0">
      <span className="text-emerald-400">guest@</span>
      <span className="text-accent">fernando</span>
      <span className="text-emerald-400">-os:~$</span>
    </span>
  );
}

function longestCommonPrefix(values: string[]): string {
  if (values.length === 0) return "";

  return values.reduce((prefix, value) => {
    let i = 0;
    while (i < prefix.length && i < value.length && prefix[i] === value[i]) i += 1;
    return prefix.slice(0, i);
  });
}

export function Terminal() {
  const [history, setHistory] = useState<TerminalHistoryEntry[]>([
    { id: "welcome", input: "", output: WELCOME_LINES },
  ]);
  const [input, setInput] = useState("");
  const [commandLog, setCommandLog] = useState<string[]>([]);
  const [logIndex, setLogIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const value = input;
    setInput("");
    setLogIndex(null);

    if (!value.trim()) return;

    setCommandLog((log) => [...log, value]);

    const result = await runTerminalCommand(value);

    setHistory((entries) => {
      if (result.clear) return [];

      return [
        ...entries,
        { id: `${Date.now()}-${entries.length}`, input: value, output: result.output },
      ];
    });
  }

  function handleTabComplete() {
    if (input.includes(" ")) return;

    const matches = terminalCommands.filter((command) =>
      command.name.startsWith(input.toLowerCase()),
    );

    if (matches.length === 0) return;

    if (matches.length === 1) {
      setInput(`${matches[0].name} `);
      return;
    }

    const prefix = longestCommonPrefix(matches.map((command) => command.name));

    if (prefix.length > input.length) {
      setInput(prefix);
      return;
    }

    setHistory((entries) => [
      ...entries,
      {
        id: `${Date.now()}-${entries.length}`,
        input: "",
        output: [matches.map((command) => command.name).join("  ")],
      },
    ]);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Tab") {
      event.preventDefault();
      handleTabComplete();
      return;
    }

    if (commandLog.length === 0) return;

    if (event.key === "ArrowUp") {
      event.preventDefault();
      const nextIndex = logIndex === null ? commandLog.length - 1 : Math.max(0, logIndex - 1);
      setLogIndex(nextIndex);
      setInput(commandLog[nextIndex]);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (logIndex === null) return;
      const nextIndex = logIndex + 1;

      if (nextIndex >= commandLog.length) {
        setLogIndex(null);
        setInput("");
      } else {
        setLogIndex(nextIndex);
        setInput(commandLog[nextIndex]);
      }
    }
  }

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="scrollbar-thin flex h-full flex-col rounded-md bg-black/40 p-3 font-mono text-[13px]"
    >
      <div ref={scrollRef} className="scrollbar-thin max-h-[26rem] flex-1 overflow-y-auto pr-1">
        {history.map((entry) => (
          <div key={entry.id} className="mb-2">
            {entry.input && (
              <div className="flex gap-2 text-zinc-300">
                <Prompt />
                <span>{entry.input}</span>
              </div>
            )}
            {entry.output.map((line, index) => (
              <p key={index} className="whitespace-pre-wrap text-zinc-400">
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2">
        <Prompt />
        <input
          ref={inputRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          spellCheck={false}
          className="flex-1 bg-transparent text-zinc-100 outline-none"
          aria-label="Terminal input"
        />
      </form>
    </div>
  );
}
