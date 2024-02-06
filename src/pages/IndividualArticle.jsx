import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios"

export default function IndividualArticle () {
    const {article_id} = useParams()

    const newsApi = axios.create({
        baseURL: 'https://nc-news-p6kr.onrender.com/api/articles'
    })

    const [articleData, setArticleData] = useState({})

    useEffect(() => {
        const getIndividualArticle = async () => {
            try {
                const response = await newsApi.get(`/${article_id}`)
                setArticleData(response.data.article)
            }catch(err){
                console.log(err)
            }
        }
        getIndividualArticle()
    },[])

    return(
        <>
        {articleData.title === undefined ? <p className="p-2">loading...</p> : <></>}
        <h1 className="text-xl py-2 text-center">{articleData.title}</h1>
        <h2 className="text-center">{articleData.author}</h2>
        <section className="px-2">votes: {articleData.votes}</section>
        <section className="indent-4 py-4 px-2">{articleData.body}</section>
        </>
    )
}