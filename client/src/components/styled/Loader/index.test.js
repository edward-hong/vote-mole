import React from 'react'
import { render } from '@testing-library/react'

import Loader from '.'

it('renders correctly', () => {
	const {
		container: { firstChild: element },
	} = render(<Loader />)

	expect(element).toMatchSnapshot()
})
