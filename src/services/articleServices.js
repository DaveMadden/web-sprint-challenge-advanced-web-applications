import axiosWithAuth from "../utils/axiosWithAuth"

const articleService = (setArticles)=> {
    axiosWithAuth()
            .get('/articles')
            .then(resp=>{
                setArticles(resp.data)
            })
            .catch (err=> {
                console.error(err);
            })
}

export default articleService;