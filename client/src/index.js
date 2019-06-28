import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, compose, createStore } from 'redux'
import { Provider as StateProvider } from 'react-redux'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import { not, equals, and, isNil } from 'ramda'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import App from './components/App'
import AlertTemplate from './components/AlertTemplate'
import rootEpic from './state/epics'
import rootReducer from './state/reducers'
import initialState from './state/initialState'

const { NODE_ENV } = process.env

// Declare redux middlewares
const epicMiddleware = createEpicMiddleware()

const appliedMiddleware = applyMiddleware(epicMiddleware)

// Use Redux Dev Tools during development
const middleware = equals(NODE_ENV, 'development')
	? composeWithDevTools(appliedMiddleware)
	: compose(appliedMiddleware)

// Declare redux store
const store = createStore(rootReducer, initialState, middleware)

// Run redux-observable epics
epicMiddleware.run(rootEpic)

// Set alert options

const alertOptions = {
	position: positions.TOP_RIGHT,
	transition: transitions.FADE,
	timeout: 3000,
}

ReactDOM.render(
	<StateProvider store={store}>
		<AlertProvider template={AlertTemplate} {...alertOptions}>
			<App />
		</AlertProvider>
	</StateProvider>,
	document.getElementById('root'),
)

// HMR
if (and(equals(NODE_ENV, 'development'), not(isNil(module.hot)))) {
	if (module.hot) {
		module.hot.accept('./components/App', () => {
			ReactDOM.render(<App />, document.querySelector('#root'))
		})
	}
}
