// import React from 'react';
import '@testing-library/jest-dom';

// import userEvent from '@testing-library/user-event';
// import MutationObserver from 'mutationobserver-shim';

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Article from './Article';

const testObj = {
    id: 1,
    headline: "what are people for?",
    createdOn: Date.now(),
    author:"Wendell Berry",
    image: 134,
    summary: "a book about how we've made an inhuman world",
    body: "This is the body. This is the body. This is the body."   
};
const testAnon = {
    id: 1,
    headline: "some generic thing",
    createdOn: Date.now(),
    author:"",
    image: 134,
    summary: "an article",
    body: "This is the body. This is the body. This is the body."   
};

test('renders component without errors', ()=> {
    render(<Article article={testObj}/>);
});

test('renders headline, author from the article when passed in through props', ()=> {
    render(<Article article={testObj}/>);

    const headline = screen.getByText(/what are people for?/i);
    const author = screen.getByText(/wendell berry/i);

    expect(headline).toBeInTheDocument();
    expect(author).toBeInTheDocument();
});

test('renders "Associated Press" when no author is given', ()=> {
    render(<Article article={testAnon}/>);

    const ap = screen.getByText(/associated press/i);

    expect(ap).toBeInTheDocument();
});

test('executes handleDelete when the delete button is pressed', ()=> {
    const fakeHandle = jest.fn();
    
    render(<Article article={testObj} handleDelete={fakeHandle}/>);

    const button = screen.getByTestId('deleteButton');
    userEvent.click(button)

    expect(fakeHandle).toHaveBeenCalled();
});