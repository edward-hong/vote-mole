import React from 'react'
import { render } from '@testing-library/react'

import Loader from '.'

describe('Loader', () => {
	it('renders correctly', () => {
		const {
			container: { firstChild: element },
		} = render(<Loader />)

		expect(element).toMatchSnapshot()
	})
})
