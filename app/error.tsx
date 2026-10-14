'use client';

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-base-content/70 mb-4 max-w-md">
        {error?.message || "An unexpected error occurred."}
      </p>
      <button onClick={() => reset()} className="btn btn-primary">
        Try again
      </button>
    </div>
  );
}