import React from 'react'
import { render } from '@testing-library/react'

import PageIndex from '.'

describe('PageIndex', () => {
	it('returns null if `poll` and `count` prop is undefined', () => {
		const { container } = render(
			<PageIndex
				polls={undefined}
				count={undefined}
				page={0}
				pageSize={5}
				onPageChange={() => {}}
			/>,
		)

		expect(container.firstChild).toBeNull()
	})

	it('returns null if `count` prop is 0', () => {
		const { container } = render(
			<PageIndex
				polls={[]}
				count={0}
				page={0}
				pageSize={5}
				onPageChange={() => {}}
			/>,
		)

		expect(container.firstChild).toBeNull()
	})

	it('renders correctly when `polls` prop is passed', () => {
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
		const { container } = render(
			<PageIndex
				polls={polls}
				count={polls.length}
				page={0}
				pageSize={5}
				onPageChange={() => {}}
			/>,
		)

		expect(container.firstChild).toMatchSnapshot()
	})
})
