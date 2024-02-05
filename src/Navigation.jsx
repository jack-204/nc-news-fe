import { Link } from "react-router-dom"

export default function Navigation(){
    return (
        <header>
            <nav>
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