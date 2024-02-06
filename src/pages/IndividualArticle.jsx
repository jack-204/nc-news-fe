import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios"
import CommentTile from "../components/CommentTile";

export default function IndividualArticle () {
    const {article_id} = useParams()

    const [voteError, setVoteError] = useState('')

    const newsApi = axios.create({
        baseURL: 'https://nc-news-p6kr.onrender.com/api/articles'
    })

    const changeVote = (amount) => {
        const newvotes = {...articleData}
        newvotes.votes += amount
        setVoteError('')
        const updateVotes = async (amount) => {
            try {
                const response = await newsApi.patch(`/${article_id}`, {inc_votes: amount})

            } catch(err){
                console.log(err)
                setVoteError('something went wrong, please try again')
                console.log(amount)
                newvotes.votes = newvotes.votes - amount
                setArticleData(newvotes)
            }
        }
        setArticleData(newvotes)
        updateVotes(amount)
        
    }

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

        <div className="py-2 flex flex-row space-x-2">
            <section className="px-8">votes: {articleData.votes}</section>
            <button className="border-2 p-1 rounded-md border-sky-500" onClick={() => changeVote(1)}>/\</button>
            <button className="border-2 p-1 rounded-md border-amber-500" onClick={() => changeVote(-1)}>\/</button>
            {voteError ? <p className="text-red-600">{voteError}</p> : null}
        </div>
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