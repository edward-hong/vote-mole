import React from 'react'
import renderWithRouter from '../../utils/renderWithRouter'

import Footer from '.'

describe('Footer', () => {
	it('renders correctly', () => {
		const {
			container: { firstChild: element },
		} = renderWithRouter(<Footer />)

		expect(element).toMatchSnapshot()
	})
})
