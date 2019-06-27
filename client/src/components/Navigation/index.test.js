import React from 'react'
import { fireEvent } from '@testing-library/react'

import Navigation from '.'
import renderWithRouterAndRedux from '../../utils/test/renderWithRouterAndRedux'

describe('Navigation', () => {
	it('renders correctly', () => {
		const { container } = renderWithRouterAndRedux(<Navigation />)

		expect(container.firstChild).toMatchSnapshot()
	})

	it('renders correctly when nav is expanded', () => {
		const { container } = renderWithRouterAndRedux(<Navigation />)
		const hamburger = container.getElementsByTagName('button')[0]

		fireEvent.click(hamburger)

		expect(container.firstChild).toMatchSnapshot()
	})
})
