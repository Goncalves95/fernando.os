import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface px-6 font-mono text-zinc-300">
      <p className="text-zinc-500">{"> Error 404: page not found"}</p>
      <p className="text-zinc-500">
        {"> Did you mean: "}
        <span className="text-accent">/projects</span>
        {" ?"}
      </p>
      <Link
        href="/"
        className="mt-4 rounded border border-surface-border px-4 py-2 text-sm text-zinc-300 hover:border-accent/50 hover:text-accent"
      >
        ← Back to Fernando OS
      </Link>
    </div>
  );
}
