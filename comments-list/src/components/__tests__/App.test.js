import React from 'react';
import { shallow } from 'enzyme';
import App from 'components/App';
import CommentBox from 'components/CommentBox';
import CommentList from 'components/CommentList';

let wrapped;

beforeEach(() => { // put some common setup logic
    wrapped = shallow(<App />);
})

// in jest we don't use real dom, we simulate it using libraray jsdom (included in CRA)
it('shows a comment box', () => {
    console.log(wrapped.find(CommentBox));
    expect(wrapped.find(CommentBox).length).toEqual(1); // an  object with property length equals 1
});

it('shows a comment list', () => {
    expect(wrapped.find(CommentList).length).toEqual(1); // an object with property length equals 1
})
