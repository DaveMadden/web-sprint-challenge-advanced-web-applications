import axiosWithAuth from "../utils/axiosWithAuth"

// const articleService = (setArticles)=> {
const articleService = ()=> {
    return axiosWithAuth()
            .get('/articles')
            .then(resp=>{
                // setArticles(resp.data)
                return resp.data
            })
            .catch (err=> {
                // console.error(err);
                console.error("error on articleservice")
            })
}

export default articleService;