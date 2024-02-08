
export default function CommentBox ({postComment, setPostComment}) {
    return(
        <textarea 
        onChange={(event) => setPostComment(event.target.value)} 
        value={postComment} autoComplete="off" 
        required id="commentBox" 
        rows="4" cols="50" 
        className="text-black bg-white"></textarea>
    )
}