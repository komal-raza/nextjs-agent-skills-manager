import Link from "next/link";

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export default function Footer(){
    return (
      <footer className="border-t border-[#362E28] bg-[#0D0B0A] text-[#A89E96]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-400 text-xs font-mono font-bold text-stone-950 shadow-[0_0_12px_rgba(245,158,11,0.3)]">
              SK
            </span>
            <span className="text-sm font-semibold tracking-tight text-[#FBF8F4]">
              Agentic Skills
            </span>
          </Link>

          <p className="text-xs text-[#7D7168]">
            Standardized <code className="font-mono text-amber-300/80">SKILL.md</code> manifests and runtime boundaries for AI agents.
          </p>

          <Link
            href="/skills"
            className="inline-flex items-center gap-2 text-xs font-medium text-[#C4B5A5] transition-colors hover:text-amber-300"
          >
            Explore Registry <ArrowIcon />
          </Link>
        </div>
      </footer>
    );
}