"use client";

import { createSkill } from "@/app/actions/skills";
import { useActionState } from "react";

const initialState = {
    message: ""
}

export default function NewSkillPage() {
    const [state, formAction, pending] = useActionState(createSkill, initialState);

    return (
        <form action={formAction}>
            <input placeholder="Name" type="text" name="name" className="input input-bordered w-full" />
            <textarea placeholder="Description" name="description" rows={3} className="input input-bordered w-full" />
            <input placeholder="Category" type="text" name="category" className="input input-bordered w-full" />

            <p aria-live="polite" className="text-red-500">{state?.message}</p>

            <button className="btn btn-block" disabled={pending}>{pending ? "Creating..." : "Create Skill"}</button>
        </form>
    )
}