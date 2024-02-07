import { useEffect, useState } from "react"
import axios from "axios"
import api from "../utils/api"
export default function CommentTile ({comment}) {
    const oldTime = comment.created_at
    let date = oldTime.substring(0, 10)
    let time = oldTime.substring(11, 16)

    const [userPicture, setUserPicture] = useState('')

    useEffect(() => {
        const getUserPicture = async () => {
            try {
                const response = await api.get(`users/${comment.author}`)
                setUserPicture(response.data.user.avatar_url)
            } catch (err){
                console.log(err)
            }
        }
        getUserPicture()
    })

    return(
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
            </div>
            
            <p className="col-span-2 row-span-3">{comment.body}</p>
            </div>
        </li>
    )
}