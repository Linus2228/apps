export default ({ dispatch }) => next => action => {
    // check to see if the action has a promise on its payload property
    // if it does, then wait for it to resolve
    // if it doesnt, the send the action to the next middleware
    if (!action.payload || !action.payload.then) {
        return next(action);
    }

    // we want to wait for promise to resolve (get its data) 
    // and then create a new action with that data and dispatch it
    action.payload
        .then((response) => {
            const newAction = { ...action, payload: response };
            dispatch(newAction);
        });
}