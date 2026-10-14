'use client'

import { updateSkill } from "@/actions/skills";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditSkillPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {

    const router = useRouter();


    const { isAuthenticated, isLoading, user } = useAuth();

    const [skillId, setSkillId] = useState<number | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("")
    const [content, setContent] = useState("");
    const [isPublic, setisPublic] = useState(true);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loadingSkill, setLoadingSkill] = useState(true)

    useEffect(() => {
        params.then((p) => setSkillId(parseInt(p.id)))
    }, [params]);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isLoading, isAuthenticated, router])

    const fetchSkill = async () => {
        try {
            if (!skillId) return;

            const response = await fetch(`/api/skills/${skillId}`, {
                method: "GET",
                credentials: "include"
            })

            if (response.ok) {
                const data = await response.json();

                if (data.skill) {
                    setName(data.skill.name);
                    setDescription(data.skill.description);
                    setContent(data.skill.content);
                    setisPublic(data.skill.isPublic)
                }
            } else if (response.status === 404) {
                setError("Skill not Found");
            } else if (response.status === 403) {
                setError("You don't have permission to edit the skill");
            }
        } catch (error) {
            setError("Failed to Load Skill detail")
        }
        finally { setLoadingSkill(false) }
    }

    useEffect(() => {
        if (skillId && user) {
            fetchSkill();
        }
    }, [skillId, user]);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        setError("");

        if (!name.trim() || !description.trim() || !content.trim()) {
            setError("All field must be filled");
            return;
        }
        if (!skillId || !user) return;
        setIsSubmitting(true)

        try {
            const result = await updateSkill(skillId, {
                name: name.trim(),
                description: description?.trim(),
                content: content.trim(),
                isPublic
            }, user!.id)


            if (result.success) {
                router.push("/dashboard");
            } else {
                setError(result.error || "Failed to update skill")
            }
        } catch (error) {
            setError("An error occured while updating skill");
            console.error("Error updating skill", error);
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isLoading || loadingSkill) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }
    if (error && !name) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-2xl">
                <div className="alert alert-error">
                    <span>{error}</span>
                </div>
                <Link href="/dashboard" className="btn btn-ghost mt-4">
                    ← Back to Dashboard
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <div className="mb-6">
                <Link href="/dashboard" className="btn btn-ghost btn-sm gap-2">
                    ← Back to Dashboard
                </Link>
            </div>

            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h1 className="card-title text-2xl">Create New Skill</h1>
                    <p className="text-base-content/70">
                        Define your agent skill using markdown format
                    </p>
                    <form onSubmit={handleSubmit} className="mt-4">
                        {error && (
                            <div className="alert alert-error mb-4">
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Skill Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., web-design-guidelines"
                                className="input input-bordered w-full"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                maxLength={100}
                                required
                            />
                        </div>

                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Brief description of what this skill does"
                                className="input input-bordered w-full"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                maxLength={500}
                                required
                            />
                        </div>

                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">Skill Content (Markdown)</span>
                            </label>
                            <textarea
                                placeholder="Enter your skill here"
                                className="textarea textarea-bordered w-full h-64 font-mono text-sm skill-content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-control mt-4">
                            <label className="label cursor-pointer justify-start gap-4">
                                <input
                                    type="checkbox"
                                    className="toggle toggle-primary"
                                    checked={isPublic}
                                    onChange={(e) => setisPublic(e.target.checked)}
                                />
                                <span className="label-text">Make this skill public</span>
                            </label>
                            <p className="text-sm text-base-content/60 ml-14">
                                Public skills appear in the gallery and can be viewed by anyone
                            </p>
                        </div>

                        <div className="card-actions justify-end mt-6">
                            <Link href="/dashboard" className="btn btn-ghost">
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Editing...
                                    </>
                                ) : (
                                    "Update Skill"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}