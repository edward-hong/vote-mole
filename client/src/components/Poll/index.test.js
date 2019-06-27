import React from 'react'

import Poll from '.'
import renderWithRouterAndRedux from '../../utils/test/renderWithRouterAndRedux'

describe('Poll', () => {
	it('renders correctly', () => {
		const { container } = renderWithRouterAndRedux(
			<Poll match={{ params: { id: '123' } }} />,
		)

		expect(container.firstChild).toMatchSnapshot()
	})
})
