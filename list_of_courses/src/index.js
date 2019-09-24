import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { Provider } from 'react-redux'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import App from './components/App'
import './index.css'

const configureStoreDev = initialState => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // add support for Redux dev tools

  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  )
}

const configureStoreProd = initialState => {
  return createStore(rootReducer, initialState, applyMiddleware(thunk))
}

const isDevelopment = process.env.NODE_ENV === 'development'
const store = isDevelopment ? configureStoreDev() : configureStoreProd

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)
