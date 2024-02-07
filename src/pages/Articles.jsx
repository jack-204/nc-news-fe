import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import axios from "axios"
import ArticleTile from "../components/ArticleTile"
import api from "../utils/api";

export default function Articles () {
    const [searchParams, setSearchParams] = useSearchParams()

    const [articles, setArticles] = useState([])

    const topic = searchParams.get('topic')

    useEffect(() => {
        const getArticles = async () => {
            try {
                const response = await api.get('articles')
                setArticles(response.data.articles)
            }catch(err) {
                console.log(err)
            }
        }
        getArticles()
    }, [])

    
    return (
        <>
            <h1 className="p-2">this is the articles page</h1>
            {articles.length === 0 ? <p className="p-2">loading articles...</p> : <></>}
            <ul>
                {articles.map((article) => {
                    return (
                        <ArticleTile article={article} key={article.article_id}/>
                    )
                })}
            </ul>
        </>
    )
}