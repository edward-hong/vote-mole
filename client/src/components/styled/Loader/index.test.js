import React from 'react'
import { render } from '@testing-library/react'

import Loader from '.'

describe('Loader', () => {
	it('renders correctly', () => {
		const { container } = render(<Loader />)

		expect(container.firstChild).toMatchSnapshot()
	})
})
