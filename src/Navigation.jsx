import { Link } from "react-router-dom"

export default function Navigation(){
    return (
        <header>
            <nav className="py-2 bg-slate-400 text-slate-950">
                <Link to="/">
                    <span>Home </span>
                </Link>
                <Link to="/articles">
                    <span>Articles </span>
                </Link>
                <Link to="/topics">
                    <span>Topics </span>
                </Link>
            </nav>
        </header>
    )
}