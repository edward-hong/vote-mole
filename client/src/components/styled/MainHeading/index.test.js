import React from 'react'
import { render } from '@testing-library/react'

import MainHeading from '.'

describe('MainHeading', () => {
	it('renders correctly', () => {
		const { container } = render(<MainHeading>Main Heading</MainHeading>)

		expect(container.firstChild).toMatchSnapshot()
	})
})
