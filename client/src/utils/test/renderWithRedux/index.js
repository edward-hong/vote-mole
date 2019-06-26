import React from 'react'
import { render } from '@testing-library/react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from '../../../state/reducers/index'

const renderWithRedux = (
	ui,
	{ initialState, store = createStore(rootReducer, initialState) } = {},
) => ({
	...render(<Provider store={store}>{ui}</Provider>),
})

export default renderWithRedux
