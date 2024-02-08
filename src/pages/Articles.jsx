import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import ArticleTile from "../components/ArticleTile"
import { getAllArticles } from "../utils/api";


export default function Articles () {
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate();
    
    const [order, setOrder] = useState('desc')

    const [articles, setArticles] = useState([])

    const topic = searchParams.get('topic')
    const sort = searchParams.get('sort_by')
    let url = `articles`

    if(topic) {
        url = url + `?topic=${topic}`
    }

    useEffect(() => {
        const call = async () => {
            try{
                const response = await getAllArticles(url, sort, order)
                setArticles(response)
            }catch(err){
                console.log(err)
            }
        }
        call()
        
    }, [topic, sort, order])

    const handleNavigate = (event) => {
        navigate(`?sort_by=${event.target.value}`)
    }


    const handleOrderChange = () => {
        if (order === 'asc') {
            setOrder('desc')
        } else {
            setOrder('asc')
        }
    }

    return (
        <>
            <h1 className="p-2">this is the articles page</h1>
            <label htmlFor="sortBy">sort by:</label>
            <select id="sortBy" onChange={(event) => handleNavigate(event)}>
                <option value="created_at">date posted</option>
                <option value="comment_count">comment count</option>
                <option value="votes">votes</option>
            </select>
            <button onClick={() => handleOrderChange()}>change order asc/desc</button>
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