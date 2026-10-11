"use client";

import { createSkill } from "@/app/actions/skills";
import { useActionState } from "react";

const initialState = {
    message: ""
}

export default function NewSkillPage() {
    const [state, formAction, pending] = useActionState(createSkill, initialState);

    return (
        <div className="flex justify-center items-center">
            <div className="card w-96 bg-base-100 shadow-sm">
                <div className="card-body">
                    <form className="p-6 flex flex-col gap-4" action={formAction}>
                        <input placeholder="Name" type="text" name="name" className="input input-bordered w-full input-md" />
                        <textarea placeholder="Description" name="description" rows={3} className="input input-bordered w-full" />
                        <input placeholder="Category" type="text" name="category" className="input input-bordered w-full" />

                        <p aria-live="polite" className="text-red-500">{state?.message}</p>
                        <div className="mt-6">
                            <button className="btn btn-primary btn-block" disabled={pending}>{pending ? "Creating..." : "Create Skill"}</button>
                        </div>
                    </form>
                </div></div></div>
    )
}