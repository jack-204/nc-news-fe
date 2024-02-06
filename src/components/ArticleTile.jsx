import { useNavigate } from "react-router-dom";

export default function ArticleTile ({article}) {
    const navigate = useNavigate();

    const oldTime = article.created_at
    let date = oldTime.substring(0, 10)
    let time = oldTime.substring(11, 16)

    const handleClick = (article_id) => {
        navigate(`/articles/${article_id}`)
    }

    return (
        <li className="p-3 flex flex-row" onClick={() => handleClick(article.article_id)}>
            <img className="object-scale-down h-40 w-40"
            src={article.article_img_url}>
                
            </img>
            <div className="p-3 py-5">
                <p >{article.title}</p>
                <p>{article.author}</p>
                <p>{date}, {time}</p>
            </div>
        </li>
    )
}