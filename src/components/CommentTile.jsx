import { useEffect, useState, useContext } from "react"
import {getCommentData, deleteCommentById} from "../utils/api"
import { UserContext } from "../context/UserContext";

export default function CommentTile ({comment}) {
    const [isDeleted, setIsDeleted] = useState(0)
    const [deleteError, setDeleteError] = useState(0)
    const username = useContext(UserContext)
    const oldTime = comment.created_at
    let date = oldTime.substring(0, 10)
    let time = oldTime.substring(11, 16)

    const [userPicture, setUserPicture] = useState('')

    useEffect(() => {
        const getUserPicture = async () => {
            try {
                const response = await getCommentData(comment.author)
                setUserPicture(response.data.user.avatar_url)
            } catch (err){
                console.log(err)
            }
        }
        getUserPicture()
    },[])

    const handleDeleteComment = () => {
        setIsDeleted(1)
        const deleteComment = async () => {
            try {
                const response = await deleteCommentById(comment.comment_id)
            } catch (err) {
                console.log(err)
                setIsDeleted(0)
                setDeleteError(1)
            }
        }
        deleteComment()
    }

    return(
        <>
        {isDeleted === 0 ? 
        <li key={comment.comment_id} className="m-2 p-2 grid grid-cols-5 grid-rows-1 border-solid border-2 rounded-md">
            
            <img 
                className="object-scale-down h-20 w-20"
                src={userPicture}
                />
            
            <div className="col-span-4 grid grid-rows-4 grid-cols-1">
            <div className="flex flex-row justify-evenly">
                <p className="mx-1">{comment.author}</p>
                <p className="mx-1">{date}, {time}</p>
                <p className="mx-1">votes: {comment.votes}</p>
                {username === comment.author ? <button className="border-2 border-red-600 rounded-md px-2"onClick={() => handleDeleteComment()}>delete</button> : <></>}
            </div>
            {deleteError === 1 ? <p className="text-red-600">could not be deleted, please try again</p> : <></>}
            <p className="col-span-2 row-span-3">{comment.body}</p>
            </div>
        </li>
         : <p>comment #{comment.comment_id} has been deleted</p>}
        </>
    )
}