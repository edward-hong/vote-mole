import React from 'react'
import { render } from '@testing-library/react'
import BlackButton from '.'

describe('BlackButton', () => {
	it('renders correctly', () => {
		const { container } = render(<BlackButton>Black Button</BlackButton>)

		expect(container.firstChild).toMatchSnapshot()
	})
})
