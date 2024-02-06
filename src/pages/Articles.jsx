import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import axios from "axios"
import ArticleTile from "../components/ArticleTile"

export default function Articles () {
    const [searchParams, setSearchParams] = useSearchParams()

    const [articles, setArticles] = useState([])

    const newsApi = axios.create({
        baseURL: 'https://nc-news-p6kr.onrender.com/api/articles'
    })

    const topic = searchParams.get('topic')

    useEffect(() => {
        const getArticles = async () => {
            try {
                const response = await newsApi.get()
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
            {articles.length === 0 ? <p className="p-2">loading...</p> : <></>}
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