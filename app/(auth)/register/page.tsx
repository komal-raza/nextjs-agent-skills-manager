"use client"

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function RegisterPage() {
    const router = useRouter();

    const { register, isAuthenticated, isLoading } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("")
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const hasRedirected = useRef(false);

    useEffect(() => {
        if (!isLoading && isAuthenticated && !hasRedirected.current) {
            hasRedirected.current = true;
            router.push("/dashboard");
        }
    }, [isLoading, isAuthenticated, router]);

    if (!isLoading && isAuthenticated) {
        return null;
    }


    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setError("");

        if (password != confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters")
        }
        setIsSubmitting(true);


        try {
            await register({ name, email, password });
            router.push("/dashboard");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Signup Failed");
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <>
            <h2 className="card-title text-2xl justify-center">Create Account</h2>
            <p className="text-center text-base-content/70">
                Join to create and share agent skills
            </p>


            <form onSubmit={handleSubmit}>
                {error && (
                    <div className="alert alert-error mb-4">
                        <span>{error}</span>
                    </div>
                )}


                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="e.g John Doe"
                        className="input input-bordered w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-control mt-4">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        className="input input-bordered w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-control mt-4">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className="input input-bordered w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}

                    />
                </div>
                <div className="form-control mt-4">
                    <label className="label">
                        <span className="label-text">Confirm Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className="input input-bordered w-full"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={6}

                    />
                </div>


                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>{isSubmitting ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : ("Sign in")}</button>
                </div>


                <div className="divider">OR</div>

                <p className="text-center">
                    Already have an account? {" "}
                    <Link href="/login" className="link link-primary">Sign in</Link>
                </p>
            </form>
        </>
    )
}