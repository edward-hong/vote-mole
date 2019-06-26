import React from 'react'
import renderWithRouter from '../../utils/test/renderWithRouter'

import Footer from '.'

describe('Footer', () => {
	it('renders correctly', () => {
		const { container } = renderWithRouter(<Footer />)

		expect(container.firstChild).toMatchSnapshot()
	})
})
