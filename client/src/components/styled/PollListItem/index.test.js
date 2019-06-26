import React from 'react'
import renderWithRouter from '../../../utils/test/renderWithRouter'

import PollListItem from '.'

describe('PollListItem', () => {
	it('renders correctly', () => {
		const { container } = renderWithRouter(
			<PollListItem id="1" question="Tabs or Spaces?" />,
		)

		expect(container.firstChild).toMatchSnapshot()
	})
})
