import React from 'react'
import { render } from '@testing-library/react'
import BlackButton from '.'

it('renders correctly', () => {
	const {
		container: { firstChild: element },
	} = render(<BlackButton>Black Button</BlackButton>)

	expect(element).toMatchSnapshot()
})
