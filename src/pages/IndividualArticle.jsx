import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios"
import CommentTile from "../components/CommentTile";
import { UserContext } from "../context/UserContext";
import api from "../utils/api";

export default function IndividualArticle () {
    const username = useContext(UserContext)

    const {article_id} = useParams()

    const [voteError, setVoteError] = useState('')
    //increment votes handling
    const changeVote = (amount) => {
        const newvotes = {...articleData}
        newvotes.votes += amount
        setVoteError('')
        const updateVotes = async (amount) => {
            try {
                const response = await api.patch(`articles/${article_id}`, {inc_votes: amount})

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

    //loads up the article and comments
    useEffect(() => {
        const getIndividualArticle = async () => {
            try {
                const response = await api.get(`articles/${article_id}`)
                setArticleData(response.data.article)
            }catch(err){
                console.log(err)
            }
        }

        const getComments = async () => {
            try {
                const response = await api.get(`articles/${article_id}/comments`)
                setComments(response.data.comments.reverse())
            }catch(err){
                console.log(err)
            }
        }
        getIndividualArticle()
        getComments()
    },[])
    const [loadingNewComment, setLoadingNewComment] = useState(0)

    //submit comment handling
    const handleSubmit = (event) => {
        event.preventDefault()
        const newComment = {
            body: event.target[0].value,
            username: username
        }
        const postComment = async () => {
            try{
                setLoadingNewComment(1)
                const response = await api.post(`/articles/${article_id}/comments`, newComment)
                let postedCommentArray = [ response.data.comment, ...comments]
                setComments(postedCommentArray)
                setLoadingNewComment(0)
            } catch(err){
                console.log(err)
            }
        }
        postComment()
    }


    return(
        <>
        {articleData.title === undefined ? <p className="p-2">loading article...</p> : <></>}
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
        <form onSubmit={handleSubmit}>
            <p><label htmlFor="commentBox">Post a comment as: {username}</label></p>
            <textarea required id="commentBox" rows="4" cols="50"></textarea>
            <button type="submit" value="submit" >submit</button>
        </form>
        {loadingNewComment === 1 ? <p className="p-2">loading new comment...</p> : <></>}
        <ul>
            {comments.map((comment) => {
                return <CommentTile comment={comment} key={comment.comment_id} className="m-2 p-2 grid grid-cols-2"/>
            })}
        </ul>
        </>
    )
}