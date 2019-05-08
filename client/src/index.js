import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, compose, createStore } from 'redux'
import { Provider } from 'react-redux'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './components/App'
import rootEpic from './state/epics'
import rootReducer from './state/reducers'
import initialState from './state/initialState'

const { NODE_ENV } = process.env

const epicMiddleware = createEpicMiddleware()

const appliedMiddleware = applyMiddleware(epicMiddleware)

const middleware =
	NODE_ENV !== 'production'
		? composeWithDevTools(appliedMiddleware)
		: compose(appliedMiddleware)

const store = createStore(rootReducer, initialState, middleware)

epicMiddleware.run(rootEpic)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)

if (NODE_ENV !== 'production') {
	if (module.hot) {
		module.hot.accept('./components/App', () => {
			ReactDOM.render(<App />, document.querySelector('#root'))
		})
	}
}
