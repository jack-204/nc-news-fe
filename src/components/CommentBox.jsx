
export default function CommentBox ({postComment, setPostComment}) {
    return(
        <textarea 
        onChange={(event) => setPostComment(event.target.value)} 
        value={postComment} autoComplete="off" 
        required id="commentBox" 
        rows="4" 
        className="text-black col-span-3 bg-slate-400 border-4 mx-4 border-black"></textarea>
    )
}