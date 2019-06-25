import React from 'react'
import { render } from '@testing-library/react'

import ErrorMessage from '.'

describe('ErrorMessage', () => {
	it('renders correctly', () => {
		const { container } = render(<ErrorMessage message="There's an error" />)

		expect(container.firstChild).toMatchSnapshot()
	})
})
