import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios"
import CommentTile from "../components/CommentTile";

export default function IndividualArticle () {
    const {article_id} = useParams()


    const newsApi = axios.create({
        baseURL: 'https://nc-news-p6kr.onrender.com/api/articles'
    })

    const [articleData, setArticleData] = useState({})
    const [comments, setComments] = useState([])
    useEffect(() => {
        const getIndividualArticle = async () => {
            try {
                const response = await newsApi.get(`/${article_id}`)
                setArticleData(response.data.article)
            }catch(err){
                console.log(err)
            }
        }

        const getComments = async () => {
            try {
                const response = await newsApi.get(`/${article_id}/comments`)
                setComments(response.data.comments.reverse())
            }catch(err){
                console.log(err)
            }
        }
        getIndividualArticle()
        getComments()
    },[])



    return(
        <>
        {articleData.title === undefined ? <p className="p-2">loading...</p> : <></>}
        <h1 className="text-xl py-2 text-center">{articleData.title}</h1>
        <h2 className="text-center">{articleData.author}</h2>
        <div className="flex justify-center">
        <img className="" src={articleData.article_img_url}></img>
        </div>
        <section className="px-8">votes: {articleData.votes}</section>
        <section className="indent-4 py-4 px-2">{articleData.body}</section>
        <section className="indent-4 p-2">Comments: </section>
        <ul>
            {comments.map((comment) => {
                return <CommentTile comment={comment} key={comment.comment_id} className="m-2 p-2 grid grid-cols-2"/>
            })}
        </ul>
        </>
    )
}