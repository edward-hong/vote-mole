import React from 'react'
import { render } from '@testing-library/react'

import renderWithRouter from '../../utils/renderWithRouter'
import Polls from '.'

describe('Polls', () => {
	it('shows the Loader component when there is no `count` and `polls` props', () => {
		const { container } = render(<Polls />)

		expect(container.firstChild).toMatchSnapshot()
	})

	it('shows the no polls message when `count` is 0', () => {
		const { container } = render(<Polls count={0} />)

		expect(container.firstChild).toHaveTextContent(
			"There aren't any polls yet. Login and click 'Add Poll' in the navigation to add a poll.",
		)
	})

	it('renders polls correctly', () => {
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
		]
		const { container } = renderWithRouter(
			<Polls count={polls.length} polls={polls} />,
		)

		expect(container.firstChild).toMatchSnapshot()
	})
})
