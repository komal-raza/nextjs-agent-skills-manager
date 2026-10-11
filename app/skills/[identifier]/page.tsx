import { Suspense } from "react";
import { getskills } from "../SKILLS";

type SkillPageProps = {
    params: Promise<{
        identifier: string;
    }>
}


async function SkillDetails({ params }: SkillPageProps) {
    const { identifier } = await params;
 const skills = await getskills();
    const skill = skills.find((skill) => skill.id===identifier);
    return skill? <article>
        <h1>{skill?.name}</h1>
        <p>{skill?.description}</p>
        <p>{skill?.category}</p>
        <p>{skill?.createdAt}</p>
        <p>{skill?.updatedAt}</p>
    </article>: <p>No Skill Found</p>
}

export default async function SkillDetailPage({
    params,
}: SkillPageProps) {


    return (
        <Suspense fallback={<p>Loading Skill Details ....</p>}>
            <SkillDetails params={params} />
        </Suspense>
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


