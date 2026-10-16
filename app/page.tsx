"use client";

import Link from "next/link";
import { useState } from "react";

const skillArchetypes = [
  {
    slug: "security-auditor",
    name: "security-auditor",
    category: "Security",
    description:
      "Performs automated OWASP Top 10 scans, detects unsanitized user inputs, and flags hardcoded credentials in diffs.",
    tags: ["OWASP", "Auth", "Static Analysis"],
    specVersion: "v1.2.0",
    scope: "Read-only inspection",
  },
  {
    slug: "design-system-linter",
    name: "design-system-linter",
    category: "Frontend",
    description:
      "Audits JSX/TSX components for design token violations, WCAG 2.1 AA color contrast, and spacing scale drift.",
    tags: ["Tailwind", "A11y", "Tokens"],
    specVersion: "v2.0.1",
    scope: "CSS / Markup review",
  },
  {
    slug: "db-migration-guard",
    name: "db-migration-guard",
    category: "Database",
    description:
      "Verifies Prisma and SQL schema migrations for exclusive table locks, destructive column drops, and missing rollback paths.",
    tags: ["PostgreSQL", "Prisma", "DDL"],
    specVersion: "v1.0.4",
    scope: "Schema validation",
  },
  {
    slug: "api-contract-sync",
    name: "api-contract-sync",
    category: "Architecture",
    description:
      "Generates deterministic TypeScript client interfaces and Zod validation schemas directly from server endpoint definitions.",
    tags: ["TypeScript", "Zod", "REST"],
    specVersion: "v1.3.0",
    scope: "Code generation",
  },
];

const sampleSkillRaw = `---
name: security-code-auditor
description: Audit pull requests for OWASP vulnerabilities, injection risks, and secret leaks.
version: 1.2.0
author: security-team
visibility: public
---

# Security Code Auditor

## Execution Boundaries
1. Never execute arbitrary or unverified scripts.
2. Flag raw database string interpolations as critical severity.
3. Verify CSRF token and secure cookie headers on mutating endpoints.
4. Require explicit type validation schemas on all incoming request bodies.

## Output Format
- Group findings by severity: Critical, High, Medium, Low.
- Provide concrete line-number references and suggested remediation diffs.`;

const sampleSkillParsed = {
  meta: [
    { key: "Specification", value: "SKILL.md standard (v1)" },
    { key: "Trigger Conditions", value: "Code review, security audit, PR scan" },
    { key: "Runtime Isolation", value: "Read-only filesystem sandbox" },
    { key: "Target Models", value: "Claude 3.7 / Gemini 2.5 / GPT-4o" },
  ],
  rules: [
    "Verify parameterized queries across all database operations",
    "Enforce httpOnly, secure, and sameSite cookie attributes",
    "Detect API key patterns and private certificates in commit history",
    "Require schema-level input validation on public routes",
  ],
};

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
    >
      <path
        fillRule="evenodd"
        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 shrink-0 text-amber-400"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"raw" | "parsed">("raw");

  return (
    <div className="w-full bg-[#0D0B0A] text-[#FBF8F4] selection:bg-amber-500/25 selection:text-amber-200">
      {/* 1. HERO SECTION */}
      <section className="relative border-b border-[#362E28] bg-gradient-to-b from-[#14100E] to-[#0D0B0A] py-16 sm:py-24 lg:py-28">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left Column: Heading and Actions */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-xs font-mono text-amber-300">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.7)]" />
                <span>SKILL.md Standard</span>
                <span className="text-amber-500/40">•</span>
                <span>Open Capability Protocol</span>
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-[#FBF8F4] leading-[1.08]">
                Deterministic skills for autonomous AI agents.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#A89E96] sm:text-lg">
                Move past fragile prompt copies. Author, version, and share
                structured Markdown skills with explicit execution boundaries,
                parameter schemas, and public or private workspace controls.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/skills"
                  className="btn bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold border-none px-6 shadow-[0_1px_2px_rgba(0,0,0,0.5),0_0_20px_rgba(245,158,11,0.2)] group"
                >
                  Explore Public Skills
                  <ArrowRightIcon />
                </Link>
                <Link
                  href="/register"
                  className="btn border-[#362E28] bg-[#171412] text-[#FBF8F4] hover:bg-[#221C18] hover:border-amber-700/50 px-6 font-medium"
                >
                  Create Your First Skill
                </Link>
              </div>

              {/* Core Attributes */}
              <div className="mt-10 grid grid-cols-2 gap-4 border-t border-[#362E28] pt-6 sm:grid-cols-3">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-amber-500/70">
                    Format
                  </div>
                  <div className="mt-1 text-sm font-semibold text-[#FBF8F4]">
                    Markdown + YAML
                  </div>
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-amber-500/70">
                    Isolation
                  </div>
                  <div className="mt-1 text-sm font-semibold text-[#FBF8F4]">
                    Public or Private
                  </div>
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-amber-500/70">
                    Compatibility
                  </div>
                  <div className="mt-1 text-sm font-semibold text-[#FBF8F4]">
                    Claude & Antigravity
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Skill Inspector */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-[#362E28] bg-[#171412] shadow-xl overflow-hidden">
                {/* Window Header / Controls */}
                <div className="flex items-center justify-between border-b border-[#362E28] bg-[#221C18] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-medium text-amber-200">
                      security-auditor/SKILL.md
                    </span>
                  </div>
                  {/* Tab Selector */}
                  <div className="flex rounded-lg border border-[#362E28] bg-[#120F0D] p-0.5 text-xs font-mono">
                    <button
                      type="button"
                      onClick={() => setActiveTab("raw")}
                      className={`px-2.5 py-1 rounded-md transition ${
                        activeTab === "raw"
                          ? "bg-amber-400 text-stone-950 font-bold"
                          : "text-[#A89E96] hover:text-[#FBF8F4]"
                      }`}
                    >
                      Raw Spec
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("parsed")}
                      className={`px-2.5 py-1 rounded-md transition ${
                        activeTab === "parsed"
                          ? "bg-amber-400 text-stone-950 font-bold"
                          : "text-[#A89E96] hover:text-[#FBF8F4]"
                      }`}
                    >
                      Agent View
                    </button>
                  </div>
                </div>

                {/* Tab 1: Raw Markdown Spec */}
                {activeTab === "raw" && (
                  <div className="p-4 bg-[#13100E]">
                    <pre className="font-mono text-xs leading-relaxed text-[#EDE8E1] whitespace-pre-wrap overflow-x-auto max-h-[380px] scrollbar-thin">
                      {sampleSkillRaw}
                    </pre>
                  </div>
                )}

                {/* Tab 2: Agent Parsed View */}
                {activeTab === "parsed" && (
                  <div className="p-4 space-y-4 max-h-[380px] overflow-y-auto bg-[#13100E]">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-amber-500/70">
                        Capability Metadata
                      </div>
                      <dl className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {sampleSkillParsed.meta.map((item) => (
                          <div
                            key={item.key}
                            className="rounded-lg border border-[#362E28] bg-[#171412] p-2 text-xs"
                          >
                            <dt className="text-amber-500/70 font-mono text-[11px]">
                              {item.key}
                            </dt>
                            <dd className="mt-0.5 font-medium text-[#FBF8F4]">
                              {item.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>

                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-amber-500/70">
                        Guaranteed Invariants
                      </div>
                      <ul className="mt-2 space-y-2">
                        {sampleSkillParsed.rules.map((rule) => (
                          <li
                            key={rule}
                            className="flex items-start gap-2 rounded-lg border border-[#362E28] bg-[#171412] p-2 text-xs text-[#EDE8E1]"
                          >
                            <CheckIcon />
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Inspector Footer */}
                <div className="flex items-center justify-between border-t border-[#362E28] bg-[#221C18] px-4 py-2 text-[11px] font-mono text-[#A89E96]">
                  <span>Standardized Capability Unit</span>
                  <span className="text-amber-400 font-semibold">Validated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


         {/* 3. CURATED ARCHETYPES DIRECTORY */}
      <section className="border-b border-[#362E28] bg-[#0D0B0A] py-16 sm:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#FBF8F4] sm:text-3xl">
                Ready-to-use capability blueprints.
              </h2>
              <p className="mt-2 text-sm text-[#A89E96] sm:text-base">
                Discover structured templates for engineering, security, and
                design workflows.
              </p>
            </div>

            <Link
              href="/skills"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-400 hover:text-amber-300"
            >
              <span>View full directory</span>
              <ArrowRightIcon />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {skillArchetypes.map((archetype) => (
              <article
                key={archetype.slug}
                className="flex flex-col justify-between rounded-xl border border-[#362E28] bg-[#171412] p-5 transition hover:border-amber-500/40 hover:bg-[#1C1815]"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-amber-500/70">
                    <span>{archetype.category}</span>
                    <span>{archetype.specVersion}</span>
                  </div>

                  <h3 className="mt-3 font-mono text-base font-bold text-[#FBF8F4]">
                    {archetype.name}
                  </h3>

                  <p className="mt-2.5 text-xs text-[#A89E96] leading-relaxed">
                    {archetype.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#362E28] pt-4">
                  <div className="text-[11px] font-mono text-amber-500/60 mb-2">
                    Scope: {archetype.scope}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {archetype.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-[#362E28] bg-[#221C18] px-2 py-0.5 text-[10px] font-mono text-amber-200/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* 4. VISIBILITY & REPOSITORY ARCHITECTURE */}
      <section className="border-b border-[#362E28] bg-[#120F0D] py-16 sm:py-20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Public Registry */}
            <div className="rounded-xl border border-[#362E28] bg-[#171412] p-6 sm:p-8">
              <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                Open Distribution
              </div>
              <h3 className="mt-3 text-xl font-bold text-[#FBF8F4]">
                Public Community Registry
              </h3>
              <p className="mt-2 text-sm text-[#A89E96] leading-relaxed">
                Publish verified skills to help other developers eliminate
                repetitive prompt engineering. Inspect full source markdown,
                version history, and author attribution.
              </p>
              <div className="mt-6">
                <Link
                  href="/skills"
                  className="btn border-[#362E28] bg-[#221C18] text-[#FBF8F4] hover:bg-amber-400 hover:text-stone-950 btn-sm font-mono text-xs"
                >
                  Browse Public Registry →
                </Link>
              </div>
            </div>

            {/* Private Workspaces */}
            <div className="rounded-xl border border-[#362E28] bg-[#171412] p-6 sm:p-8">
              <div className="text-xs font-mono uppercase tracking-wider text-amber-500/60 font-semibold">
                Workspace Isolation
              </div>
              <h3 className="mt-3 text-xl font-bold text-[#FBF8F4]">
                Protected Private Skills
              </h3>
              <p className="mt-2 text-sm text-[#A89E96] leading-relaxed">
                Internal coding guidelines, database credentials conventions, and
                proprietary workflows remain secure within your authenticated
                account dashboard with strict access control.
              </p>
              <div className="mt-6">
                <Link
                  href="/register"
                  className="btn border-[#362E28] bg-[#221C18] text-[#FBF8F4] hover:bg-amber-400 hover:text-stone-950 btn-sm font-mono text-xs"
                >
                  Set Up Private Workspace →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="bg-[#0D0B0A] py-16 sm:py-24">
        <div className="container mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-amber-500/25 bg-gradient-to-b from-[#1C1714] to-[#120F0D] p-8 sm:p-12 shadow-xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#FBF8F4] sm:text-4xl">
              Build your team&apos;s agent skill library.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-[#A89E96]">
              Start structuring your agent workflows today. Publish reusable
              instructions or create a private collection for your projects.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/register"
                className="btn bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold border-none px-6"
              >
                Get Started for Free
              </Link>
              <Link
                href="/skills"
                className="btn border-[#362E28] bg-[#221C18] text-[#FBF8F4] hover:bg-[#2A2420] px-6 font-medium"
              >
                Explore Existing Skills
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
