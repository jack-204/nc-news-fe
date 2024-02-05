export default function ArticleTile (props) {
    const article = props.article
    const oldTime = article.created_at
    let date = oldTime.substring(0, 10)
    let time = oldTime.substring(11, 16)

    return (
        <li className="p-3 flex flex-row">
            <img className="object-scale-down h-40 w-40"
            src={article.article_img_url}>
            </img>
            <div className="p-3 py-5">
                <p>{article.title}</p>
                <p>{article.author}</p>
                <p>{date}, {time}</p>
            </div>
        </li>
    )
}