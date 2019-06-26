import React from 'react'

import Graph from '.'
import renderWithRedux from '../../../utils/test/renderWithRedux'

describe('Graph', () => {
	it('returns `null` when there is no `poll` prop', () => {
		const { container } = renderWithRedux(<Graph />)

		expect(container.firstChild).toBeNull()
	})

	it('renders correctly when `poll` prop is passed in', () => {
		const poll = {
			pollQuestion: 'Favourite Language',
			pollOptions: [
				{
					votes: 3,
					option: 'English',
				},
				{
					votes: 6,
					option: 'French',
				},
				{
					votes: 9,
					option: 'German',
				},
				{
					votes: 5,
					option: 'Russian',
				},
			],
		}
		const { container } = renderWithRedux(<Graph poll={poll} />, {
			initialState: { poll: poll },
		})

		expect(container.firstChild).toMatchSnapshot()
	})
})
