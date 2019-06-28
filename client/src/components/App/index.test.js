import React from 'react'

import App from '.'
import renderWithRouterAndRedux from '../../utils/test/renderWithRouterAndRedux'
import { fetchUser, fetchAllPolls, clearPolls } from '../../state/actions'

jest.mock('../../state/actions', () => ({
	fetchUser: jest.fn(),
	fetchAllPolls: jest.fn(),
	clearPolls: jest.fn(),
}))

fetchUser.mockImplementation(() => ({ type: 'test' }))
fetchAllPolls.mockImplementation(() => ({ type: 'test' }))
clearPolls.mockImplementation(() => ({ type: 'test' }))

describe('App', () => {
	it('renders correctly', () => {
		const { container } = renderWithRouterAndRedux(<App />)

		expect(container.firstChild).toMatchSnapshot()
	})
})
