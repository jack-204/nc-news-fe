import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import ArticleTile from "../components/ArticleTile"
import { getAllArticles } from "../utils/api";


export default function Articles () {
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate();
    const [articlesError, setArticlesError] = useState(0)
    const [order, setOrder] = useState('desc')

    const [articles, setArticles] = useState([])

    const topic = searchParams.get('topic')
    const sort = searchParams.get('sort_by')

    let url = `articles`
    url = url + `?order=${order}`

    if (topic) {
        url = url + `&topic=${topic}`
    }
    
    if (sort) {
        url = url + `&sort_by=${sort}`
    }


    useEffect(() => {
        const call = async () => {
            try{
                const response = await getAllArticles(url, sort, order)
                setArticles(response.data.articles)
            }catch(err){
                console.log(err)
            }
        }
        call()
        
    }, [topic, sort, order])

    const handleNavigate = (event) => {
        if(topic){
            navigate(`?topic=${topic}&sort_by=${event.target.value}`)
        } else{
            navigate(`?sort_by=${event.target.value}`)
        }
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
            <span className="flex">
            <select id="sortBy" onChange={(event) => handleNavigate(event)} className="bg-blue-500 text-black">
                <option value="created_at">date posted</option>
                <option value="comment_count">comment count</option>
                <option value="votes">votes</option>
            </select>
            <button 
            className="mx-4 p-1 rounded-md bg-blue-500 text-black"
            onClick={() => handleOrderChange()}>change order</button>
            <p>current order: {order}ending</p>
            </span>
            {articles === undefined ? <p>No articles found for this topic</p> : <>
            
            {articles.length === 0 ? <p className="p-2">loading articles...</p> : <></>}
            <ul>
                {articles.map((article) => {
                    return (
                        <ArticleTile article={article} key={article.article_id}/>
                    )
                })}
            </ul>
            </>}
        </>
    )
}