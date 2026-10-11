import Link from "next/link";

export default function NotFound() {
  return <section>

    <h1>404 - Page you are looking for is not available</h1>
    <Link href="/" className="btn btn-outline">Go back to Skills</Link>
  </section>
}