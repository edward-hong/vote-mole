import React from 'react'
import { render } from '@testing-library/react'

import ErrorMessage from '.'

it('renders correctly', () => {
	const {
		container: { firstChild: element },
	} = render(<ErrorMessage message="There's an error" />)

	expect(element).toMatchSnapshot()
})
