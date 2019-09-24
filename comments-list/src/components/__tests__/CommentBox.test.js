import React from 'react';
import { mount } from 'enzyme';
import CommentBox from 'components/CommentBox';
import Root from 'Root';

let wrapped;
// after redux connection we get errors in testing cuase we test react component separatly from redux provider.
// to avoid this we create Root component (with redux provider) - a wrapper for test cases to push components with redux

beforeEach(() => { // (1) step
    wrapped = mount(
    <Root>
        <CommentBox />
    </Root>);
})

afterEach(() => { // (3) step and so on for each testing function 'it'
    wrapped.unmount();
})

it('has a text area and 2 buttons', () => { // (2) step
    expect(wrapped.find('textarea').length).toEqual(1);
    expect(wrapped.find('button').length).toEqual(2);
});

describe('the text area', () => {  // is used to unite similar behavior/code for components
    beforeEach(() => {
        // find the text area element
        // simulate 'change' event
        // provide a fake event object
        // force the component to update
        wrapped.find('textarea').simulate('change', { // this object will be merged into real event object
            target: {
                value: 'new comment'
            }
        })
        wrapped.update(); // cause react setstate works asynchronously but we need immediate result for our tests
    })
    it('has a text area that user can type in', () => {
        // assert that the textareas value has changed
        expect(wrapped.find('textarea').prop('value')).toEqual('new comment');
    })

    it('when button is submitted, text area should get emptied', () => {
        // we simlulate an action with the from instead of button
        // to simulate prop we should have it in our element/component (button doesn't have onClick handler)
        // instead form has onSubmit handler and it happends when we click button
        wrapped.find('form').simulate('submit');
        wrapped.update();
        expect(wrapped.find('textarea').prop('value')).toEqual('');
    })

})