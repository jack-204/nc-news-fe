import axios from "axios"

const api = axios.create({
    baseURL: "https://nc-news-p6kr.onrender.com/api/"
})

export default api