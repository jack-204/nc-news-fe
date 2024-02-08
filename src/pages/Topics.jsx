import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {getAllTopics} from "../utils/api";

export default function Topics () {
    const [topics, setTopics] = useState([])
    useEffect(() => {
        const getTopics = async () => {
            try {
                const response = await getAllTopics()
                setTopics(response.data.topics)
            } catch(err) {
                console.log(err)
            }
        }
        getTopics()
    },[])

    return (
        <>
        <p className="p-2">this is the topics page</p>
        <ul className="p-2">
            {topics.map((topic) => {
                const url = `/articles?topic=${topic.slug}`
                return (<li key={topic.slug} className="my-8 border-solid border-b">
                    <Link to={url}>
                        <p>{topic.slug}</p>
                        <p>{topic.description}</p>
                    </Link>
                </li>)
            })}
        </ul>
        </>
    )
}