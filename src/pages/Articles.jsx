import { useSearchParams } from "react-router-dom"

export default function Articles () {
    const [searchParams, setSearchParams] = useSearchParams()

    const topic = searchParams.get('topic')
    console.log(topic)
    return (
        <>
            <p className="p-2">this is the articles page</p>
        </>
    )
}