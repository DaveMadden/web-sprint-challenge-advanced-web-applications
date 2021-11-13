import axiosWithAuth from "../utils/axiosWithAuth"

const articleService = ()=> {
    return axiosWithAuth()
            .get('/articles')
            .then(resp=>{
                return resp.data //can also pass setArticles in via props and set state here. it totally works, just won't test right.
            })
            .catch (err=> {
                console.error(err);
            })
}

export default articleService;