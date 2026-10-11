import Link from "next/link";
import { getskills } from "./SKILLS"

export default async function SkillsPage() {
    const skills = await getskills();
    return (
        <section className="m-8">
            <div className="flex justify-between items-center">
                <h1>Skills</h1>

                <Link href="/skills/create" className="btn btn-wide" > Create Skill</Link>

            </div>
            <ul className="mb-5 p-10">
                {skills.map((skill) => {
                    return (
                        <li key={skill.id}>
                            <Link href={`skills/${skill.id}`}>{skill.name}</Link></li>
                    )
                })}
            </ul>
        </section>
    )
}

