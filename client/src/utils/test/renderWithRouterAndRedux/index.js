import React from 'react'
import { render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from '../../../state/reducers/index'

const renderWithRouterAndRedux = (
	ui,
	{
		initialState,
		store = createStore(rootReducer, initialState),
		route = '/',
		history = createMemoryHistory({ initialEntries: [route] }),
	} = {},
) => ({
	...render(
		<Provider store={store}>
			<Router history={history}>{ui}</Router>
		</Provider>,
	),
	history,
})

export default renderWithRouterAndRedux
