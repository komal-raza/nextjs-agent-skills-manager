'use cache'
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { cacheLife } from 'next/cache'; // Adjust import based on your exact Next.js 16 minor version


// export const revalidate = 60; 
//  X This compile error occurs because you have enabled nextConfig.cacheComponents (the new caching model in Next.js 16), which completely removes support for legacy Route Segment Configurations like export const revalidate. Under this new architecture, everything is dynamic by default, and caching is handled granularly using directives.
export const metadata = {
    title: "Browse Skills | Agent Skills Manager",
    description: "Explore public AI agent skills created by the community"
}

// Defined the server side actions(functions)
async function getPublicSkills() {
    const skills = await prisma.skill.findMany({
        where: { isPublic: true },
        include: {
            author: { select: { name: true } }
        }
        , orderBy: { createdAt: "desc" }
    })

    return skills;
}
export default async function SkillsPage() {
    const skills = await getPublicSkills();

     // / 2. Set your revalidation times (in seconds)
    cacheLife({
        stale: 60,       // How long the cache is considered fresh
        revalidate: 120, // Time window to fetch new data in the background
        expire: 3600     // Hard expiration limit
    });
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Public Skills Gallery</h1>
                    <p className="text-base-content/70 mt-2">
                        This page uses ISR - revalidates every 60 seconds
                    </p>
                </div>
                <div className="badge badge-secondary badge-lg">ISR: 60s</div>
            </div>

            {skills.length === 0 ? (
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">📭</div>
                    <h2 className="text-xl font-semibold mb-2">No skills yet</h2>
                    <p className="text-base-content/70 mb-4">
                        Be the first to create a skill!
                    </p>
                    <Link href="/register" className="btn btn-primary">
                        Get Started
                    </Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skill: (typeof skills)[number]) => (
                        <Link
                            key={skill.id}
                            href={`/skills/${skill.id}`}
                            className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow"
                        >
                            <div className="card-body">
                                <h2 className="card-title">{skill.name}</h2>
                                <p className="text-base-content/70 line-clamp-2">
                                    {skill.description}
                                </p>
                                <div className="card-actions justify-between items-center mt-4">
                                    <span className="text-sm text-base-content/60">
                                        by {skill.author.name}
                                    </span>
                                    <span className="text-xs text-base-content/50">
                                        {new Date(skill.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

