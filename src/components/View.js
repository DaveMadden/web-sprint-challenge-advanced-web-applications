import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import axios from 'axios';

import Article from './Article';
import EditForm from './EditForm';
import articleService from '../services/articleServices';
import axiosWithAuth from '../utils/axiosWithAuth';


const View = (props) => {
    const [articles, setArticles] = useState([]);
    const [editing, setEditing] = useState(false);
    const [editId, setEditId] = useState();

    const handleDelete = (id) => {
        axiosWithAuth()
            .delete(`/articles/${id}`)
            .then(resp=>{
                setArticles(resp.data);
            })
            .catch(err=>{
                console.error(err);
            })
    }

    const handleEdit = (article) => {
       axiosWithAuth()
            .put(`/articles/${editId}`, article)
            .then(resp=>{
                setArticles(resp.data);
            })
            .catch(err=>{
                console.error(err);
            })
            .finally(setEditing(false))
    }

    const handleEditSelect = (id)=> {
        setEditing(true);
        setEditId(id);
    }

    const handleEditCancel = ()=>{
        setEditing(false);
    }
    
    useEffect(()=>{
        fetchService()
    }, []);

    //has to be a separate function (and async) so we're not setting state with a promise (or inside a useEffect). Other option was updating state in articleService() by passing setArticles as props. That functioned just fine, but was not testable like the instructions want, so refactored to do it this way.
    const fetchService = async () =>{
        const data = await articleService();
        setArticles(data);
    }

    return(<ComponentContainer>
        <HeaderContainer>View Articles</HeaderContainer>
        <ContentContainer flexDirection="row">
            <ArticleContainer>
                {
                    articles.map(article => {
                        return <ArticleDivider key={article.id}>
                            <Article key={article.id} article={article} handleDelete={handleDelete} handleEditSelect={handleEditSelect}/>
                        </ArticleDivider>
                    })
                }
            </ArticleContainer>
            
            {
                editing && <EditForm editId={editId} handleEdit={handleEdit} handleEditCancel={handleEditCancel}/>
            }
        </ContentContainer>
    </ComponentContainer>);
}

export default View;

const HeaderContainer = styled.h1`
    border-bottom: solid black 2px;
    padding: 1em;
    margin:0;
    font-size: 1.5em;
    background: black;
    color: white;
`

const ArticleDivider = styled.div`
    border-bottom: 1px solid black;
    padding: 1em;
`

const ComponentContainer = styled.div`
    display:flex;
    width: 80%;
    flex-direction: column;
    justify-content: center;
    
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.flexDirection};
`

const ArticleContainer = styled.div`
    background: grey;
`;