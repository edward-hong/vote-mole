import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, compose, createStore } from 'redux'
import { Provider } from 'react-redux'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'
import { not, equals, and, isNil } from 'ramda'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import App from './components/App'
import rootEpic from './state/epics'
import rootReducer from './state/reducers'
import initialState from './state/initialState'

const { NODE_ENV } = process.env

// Declare redux middlewares
const epicMiddleware = createEpicMiddleware()

const appliedMiddleware = applyMiddleware(epicMiddleware)

// Use Redux Dev Tools during development
const middleware = not(equals(NODE_ENV, 'production'))
	? composeWithDevTools(appliedMiddleware)
	: compose(appliedMiddleware)

// Declare redux store
const store = createStore(rootReducer, initialState, middleware)

epicMiddleware.run(rootEpic)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)

// HMR
if (and(not(equals(NODE_ENV, 'production')), not(isNil(module.hot)))) {
	if (module.hot) {
		module.hot.accept('./components/App', () => {
			ReactDOM.render(<App />, document.querySelector('#root'))
		})
	}
}
