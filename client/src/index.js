import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, compose, createStore } from 'redux'
import { Provider } from 'react-redux'
import { BehaviorSubject } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'
import { not, equals, and, isNil } from 'ramda'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './components/App'
import rootEpic from './state/epics'
import rootReducer from './state/reducers'
import initialState from './state/initialState'

const { NODE_ENV } = process.env

const epicMiddleware = createEpicMiddleware()

const appliedMiddleware = applyMiddleware(epicMiddleware)

const middleware = not(equals(NODE_ENV, 'production'))
	? composeWithDevTools(appliedMiddleware)
	: compose(appliedMiddleware)

const store = createStore(rootReducer, initialState, middleware)

const epic$ = new BehaviorSubject(rootEpic)

const hotReloadingEpic = (...args) =>
	epic$.pipe(switchMap(epic => epic(...args)))

epicMiddleware.run(hotReloadingEpic)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)

if (and(not(equals(NODE_ENV, 'production')), not(isNil(module.hot)))) {
	if (module.hot) {
		module.hot.accept('./state/epics', () => {
			const nextRootEpic = require('./state/epics').rootEpic
			epic$.next(nextRootEpic)
		})
		module.hot.accept('./components/App', () => {
			ReactDOM.render(<App />, document.querySelector('#root'))
		})
	}
}
