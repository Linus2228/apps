import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios'; // mock of async requests
import Root from 'Root';
import App from 'components/App';

beforeEach(() => {
    moxios.install();
    moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
        status: 200,
        response: [{ name: 'Fetch #1' }, { name: 'Fetch #2' }]
    });
})

afterEach(() => {
    moxios.uninstall();
})
it('can fetch a list of components and display them', (done) => {
    // attempt to render the entire app
    const wrapped = mount(
        <Root>
            <App />
        </Root>
    )

    // find the "fetchComments" button and click it
    wrapped.find('.fetch-comments').simulate('click')

    // expect to find a list of comments
    // introduce a little pause to let moxios time to return fake data
    moxios.wait(() => {
        wrapped.update();
        expect(wrapped.find('li').length).toEqual(2);
        done(); // jest doesn't handle setTimeout and checks line by line so we use callback 'done' to show Jest
        // wait intill done will be executed
    });
    


})