import Link from "next/link"

export const Header = () => {
    return (
        <div className="max-lg:collapse bg-base-200 lg:mb-48 shadow-sm w-full rounded-md">
            <input id="navbar-1-toggle" className="peer hidden" type="checkbox" />
            <label htmlFor="navbar-1-toggle" className="fixed inset-0 hidden max-lg:peer-checked:block"></label>
            <div className="collapse-title navbar">
                <div className="navbar-start">
                    <label htmlFor="navbar-1-toggle" className="btn btn-ghost lg:hidden">
                        <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <Link href="/" className="btn btn-ghost text-xl">Agentic Skills</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link href="/skills">Skills</Link></li>

                        <li><Link href="/about">About</Link></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <Link href="/login" className="btn">Login</Link>
                    
                </div>
            </div>

            <div className="collapse-content lg:hidden z-1">
                <ul className="menu">
                    <li><Link href="/skills">Skills</Link></li>
                    <li><Link href="/about">About</Link></li>
                </ul>
            </div>
        </div>
    )
}