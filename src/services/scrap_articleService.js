import axiosWithAuth from "../utils/axiosWithAuth"
import stripTags from 'striptags';

const articleService = ()=> {
    return axiosWithAuth()
            .get('/articles')
            .then(resp=>{
                const { data } = resp
                // setArticles(data)
                return {
                    id: data.id,
                    headline: data.headline,
                    createdOn: data.createdOn,
                    author: data.author,
                    image: data.image,
                    summary: stripTags(data.summary),
                    body: stripTags(data.body)
                }
            })
            .catch (err=> {
                console.error(err);
            })
}

export default articleService;