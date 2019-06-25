import React from 'react'
import { render } from '@testing-library/react'

import Row from '.'

describe('Row', () => {
	it('renders correctly', () => {
		const { container } = render(<Row />)

		expect(container.firstChild).toMatchSnapshot()
	})
})
