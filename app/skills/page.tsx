import Link from "next/link";
import { getskills } from "./SKILLS"

export default async function SkillsPage() {
    const skills = await getskills();
    return (
        <section className="flex flex-col gap-4 max-w-lg mx-auto">
            <div className="flex justify-between items-center">
                <h1>Skills</h1>

                <Link href="/skills/create" className="btn btn-primary" > Create Skill</Link>

            </div>
            <ul className="flex flex-col gap-4">
                {skills.map((skill) => {
                    return (
                        <li key={skill.id}>
                            <div className="card w-96 bg-base-100 shadow-sm">
                                <div className="card-body">
                                    <Link href={`skills/${skill.id}`} className="flex justify-between items-center">
                                        {skill.name}
                                        <div className="card-actions justify-end">
                                            <button className="btn btn-error">⌫</button>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

