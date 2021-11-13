import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import View from './View';

import articleService from "../services/articleServices";
jest.mock("../services/articleServices");

const testThree = [
    {
        id: 1,
        headline: "World-Ending Fire",
        createdOn: Date.now(),
        author:"Wendell Berry",
        image: 134,
        summary: "a book about how people should live",
        body: "This is the body. This is the body. This is the body."   
    },{
        id: 2,
        headline: "what are people for?",
        createdOn: Date.now(),
        author:"Wendell Berry",
        image: 134,
        summary: "a book about how we've made an inhuman world",
        body: "This is the body. This is the body. This is the body."   
    },{
        id: 3,
        headline: "World Made By Hand",
        createdOn: Date.now(),
        author:"James Howard Kunstler",
        image: 134,
        summary: "a novel set in a world where cheap oil is gone",
        body: "This is the body. This is the body. This is the body."   
    }
];

test("renders zero articles without errors", async () => {
    articleService.mockResolvedValueOnce([]);

    render(<View/>)

    const article = screen.queryByTestId("article");

    expect(article).not.toBeTruthy();

});

test("renders three articles without errors", async ()=> {
    articleService.mockResolvedValueOnce(testThree);

    render(<View/>)

    const articles = await screen.findAllByTestId("article");
    
    expect(articles.length).toBe(3);
});

//Task List
//1. Complete the above two tests. Make sure to mocking the articleService call before rendering.