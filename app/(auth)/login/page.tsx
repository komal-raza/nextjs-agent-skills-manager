"use client"
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {

    const router = useRouter();

    const { login, isAuthenticated, isLoading } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.replace("/dashboard");
        }
    }, [isLoading, isAuthenticated, router]);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);


        try {
            await login({ email, password });
        } catch (error) {
            setError(error instanceof Error ? error.message : "Login failed");
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <>
            <h2 className="card-title text-2xl justify-center">Welcome Back</h2>
            <p className="text-center text-base-content/70">
                Sign in to manage your agent skills
            </p>


            <form onSubmit={handleSubmit}>
                {error && (
                    <div className="alert alert-error mb-4">
                        <span>{error}</span>
                    </div>
                )}


                <div className="form-control">
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
                    />
                </div>


                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>{isSubmitting ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : ("Sign in")}</button>
                </div>


                <div className="divider">OR</div>

                <p className="text-center">
                    Don&apos;t have an account? {" "}
                    <Link href="/register" className="link link-primary">Sign up</Link>
                </p>
            </form>
        </>
    )
}