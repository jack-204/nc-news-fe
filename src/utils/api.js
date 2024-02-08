import axios from "axios"

const api = axios.create({
    baseURL: "https://nc-news-p6kr.onrender.com/api/"
})

const getAllArticles = (url, sort, order) => {

    const getArticles = async () => {
        try {
            const response = await api.get(url)
            let articles = response.data.articles
            if(sort === 'created_at'){
                if(order === 'asc'){
                    articles.sort((a, b) => Date.parse(a[sort]) - Date.parse(b[sort]))
                } else {
                    articles.sort((a, b) => Date.parse(b[sort]) - Date.parse(a[sort]))
                }
            } else {
                if(order === 'asc'){
                    articles.sort((a, b) => a[sort] - b[sort])
                } else {
                    articles.sort((a, b) => b[sort] - a[sort])
                }
            }
            return(response.data.articles)
        }catch(err) {
            console.log(err)
        }
    }
    return getArticles()
}
    
const incrementVotes = (amount,article_id) => {
    const response = api.patch(`articles/${article_id}`, {inc_votes: amount})
}

const getIndividualArticle = (article_id) => {
    return api.get(`articles/${article_id}`)
}

const getCommentsForArticle = (article_id) => {
    return api.get(`articles/${article_id}/comments`)
}

const postNewComment = (article_id, newComment) => {
    return api.post(`/articles/${article_id}/comments`, newComment)
}

const getAllTopics = () => {
    return api.get('/topics')
}

const getCommentData = (author) => {
    return api.get(`users/${author}`)
}

const deleteCommentById = (comment_id) => {
    return api.delete(`/comments/${comment_id}`)
}

export { deleteCommentById, getAllArticles, incrementVotes, getIndividualArticle, getCommentsForArticle, postNewComment, getAllTopics, getCommentData }