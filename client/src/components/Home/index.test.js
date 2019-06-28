import React from 'react'
import { fireEvent } from '@testing-library/react'

import Home from '.'
import renderWithRouterAndRedux from '../../utils/test/renderWithRouterAndRedux'
import { fetchAllPolls, clearPolls } from '../../state/actions'

jest.mock('../../state/actions', () => ({
	fetchAllPolls: jest.fn(),
	clearPolls: jest.fn(),
}))

fetchAllPolls.mockImplementation(() => ({ type: 'test' }))
clearPolls.mockImplementation(() => ({ type: 'test' }))

const polls = [
	{
		id: '5cdaf28cee882077685935e3',
		pollQuestion: 'PHP, Python or Ruby?',
	},
	{
		id: '5cdaf0d4ee882077685935de',
		pollQuestion: 'Favourite JavaScript Framework',
	},
	{
		id: '5cdaf0a6ee882077685935d9',
		pollQuestion: 'Favourite Sport',
	},
	{
		id: '5cdaf088ee882077685935d6',
		pollQuestion: 'Favourite Movie',
	},
	{
		id: '5cdaf04fee882077685935d1',
		pollQuestion: 'Favourite Superhero',
	},
	{
		id: '5cdaf04fee882077685djx0qe',
		pollQuestion: 'Favourite Colour',
	},
]

describe('Home', () => {
	it('renders correctly', () => {
		const { container } = renderWithRouterAndRedux(<Home />, {
			initialState: { polls: { count: polls.length, polls } },
		})

		expect(container.firstChild).toMatchSnapshot()
	})

	it('clicking on the pagination buttons loads new pages', () => {
		const { getByText, container } = renderWithRouterAndRedux(<Home />, {
			initialState: { polls: { count: polls.length, polls } },
		})
		const nextPageButton = getByText('›')

		fireEvent.click(nextPageButton)

		expect(container.firstChild).toMatchSnapshot()
	})
})
