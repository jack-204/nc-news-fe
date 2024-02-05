import { Link } from "react-router-dom";

export default function Topics () {
    return (
        <>
        <p className="p-2">this is the topics page</p>
        <ul className="p-2">
            <li key="t1">
                <Link to="/articles?topic=t1">
                    <span>t1</span>
                </Link>
            </li>
            <li key="t2">
                <Link to="/articles?topic=t2">
                    <span>t2</span>
                </Link>
            </li>
            <li key="t3">
                <Link to="/articles?topic=t3">
                    <span>t3</span>
                </Link>
            </li>
        </ul>
        </>
    )
}