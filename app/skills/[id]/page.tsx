'use cache';

import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";


interface PageProps {
    params: Promise<{ id: string }>;
}

type SkillWithAuthor = {
    id: number;
    name: string;
    description: string | null;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    isPublic: boolean;
    author: {
        name: string | null;
    } | null;
};

export async function generateMetadata({ params }: PageProps) {
    const { id } = await params;

    const skill = await prisma.skill.findUnique({
        where: { id: parseInt(id) },
        select: { name: true, description: true }
    });

    if (!skill) {
        return { title: "Skill Not Found" };
    }

    return {
        title: `${skill.name} | Agent Skills Manager`,
        description: skill.description
    }
}

// Defined the server side actions(functions)
async function getSkill(id: string): Promise<SkillWithAuthor | null> {
    const skill = await prisma.skill.findUnique({
        where: { id: parseInt(id), isPublic: true },
        include: {
            author: {
                select: { name: true },
            },
        },
    });

    if (!skill) {
        return null;
    }

    return skill as SkillWithAuthor;
}

const SkillDetailCard = ({ skill }: { skill: SkillWithAuthor }) => {
    return (

        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-6">
                <Link href="/skills" className="btn btn-ghost btn-sm gap-2">
                    ← Back to Skills
                </Link>
            </div>

            <article className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold">{skill.name}</h1>
                            <p className="text-base-content/70 mt-2">{skill.description}</p>
                        </div>
                        <div className="badge badge-secondary">ISR</div>
                    </div>

                    <div className="divider"></div>

                    <div className="flex gap-4 text-sm text-base-content/60 mb-4">
                        <span>By {skill?.author?.name}</span>
                        <span>•</span>
                        <span>Created {new Date(skill.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>Updated {new Date(skill.updatedAt).toLocaleDateString()}</span>
                    </div>

                    <div className="bg-base-300 rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">Skill Content</h2>
                        <pre className="skill-content whitespace-pre-wrap text-sm">
                            {skill.content}
                        </pre>
                    </div>
                </div>
            </article>
        </div>
    )
}


async function SkillDetails({ params }: PageProps) {
    const { id } = await params;
    const skill = await getSkill(id);

    if (!skill) {
        // throw new Error("Skill Not Found")
        notFound();
    }

    return <SkillDetailCard skill={skill} />
}

export default async function SkillDetailPage({
    params,
}: PageProps) {


    return (
        <SkillDetails params={params} />
    )
}



// /**
//  * Error We Got 
//  * Error: Route "/skills/[identifier]": Next.js encountered runtime data during prerendering.

// `cookies()`, `headers()`, `params`, or `searchParams` accessed outside of `<Suspense>` prevents the route from being prerendered, blocking the page load and leading to a slower user experience.

// Ways to fix this:
//   - [stream] Provide a placeholder with `<Suspense fallback={...}>` around the data access
//   - [block] Set `export const instant = false` to allow a blocking route

// Learn more: https://nextjs.org/docs/messages/blocking-prerender-runtime
//     at SkillDetailPage (app/skills/[identifier]/page.tsx:11:26)
//    9 | }: SkillPageProps){
//   10 |
// > 11 |     const {identifier} = await params ;
//      |                          ^
//   12 |     return (
//   13 |         <h2>
//   14 |             Skill Details of ID {identifier}
//  * 


//   ?//Solution to Fixed this

//   In modern Next.js, params is a Promise, so awaiting it is correct. The problem is not necessarily your await statement. The error indicates that Next.js is detecting runtime data access during prerendering without an appropriate Suspense boundary.

//  The outer page can render without awaiting params. The inner SkillDetails component reads the parameter inside the Suspense boundary, allowing Next.js to render the fallback while the dynamic part resolves. This follows the recommended pattern in the 
// Next.js documentation
//   */


