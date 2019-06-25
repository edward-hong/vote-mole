import React from 'react'
import renderWithRouter from '../../../utils/renderWithRouter'

import PollListItem from '.'

describe('PollListItem', () => {
	it('renders correctly', () => {
		const {
			container: { firstName: element },
		} = renderWithRouter(<PollListItem id="1" question="Tabs or Spaces?" />)

		expect(element).toMatchSnapshot()
	})
})
