import React from 'react';
import { mount } from 'enzyme';
import CommentList from 'components/CommentList';
import Root from 'Root';

let wrapped;

beforeEach(() => {
    const initialState = {
        comments: ['Comment 1', 'Comment 2']
    };

    wrapped = mount(
        <Root initialState={initialState}>
            <CommentList /> {/*  if we pass here prop comments={['sdf', 'sfdsf']} to test data it will be overwitten by mapDispathToProps */}
        </Root>);
})

afterEach(() => {
    wrapped.unmount();
})

it('creates one LI per comment', () => {
    expect(wrapped.find('li').length).toEqual(2);
});

it('it shows text for each comment', () => {
    expect(wrapped.render().text()).toContain('Comment 1');
    expect(wrapped.render().text()).toContain('Comment 2');
});
