import React from 'react'
import { render } from '@testing-library/react'

import CustomOption from '.'

describe('CustomOption', () => {
	it('shows error message when there is an error', () => {
		const error = 'Please enter your custom selection'
		const { getByText } = render(
			<CustomOption
				input={{ name: 'customOption' }}
				meta={{ touched: true, error }}
			/>,
		)

		expect(getByText(error)).toHaveTextContent(error)
	})

	it('renders correctly when valid', () => {
		const { container } = render(
			<CustomOption
				input={{ name: 'customOption' }}
				meta={{ touched: true, error: false }}
			/>,
		)

		expect(container.firstChild).toMatchSnapshot()
	})

	it('renders correctly when untouched', () => {
		const { container } = render(
			<CustomOption
				input={{ name: 'customOption' }}
				meta={{ touched: false, error: false }}
			/>,
		)

		expect(container.firstChild).toMatchSnapshot()
	})
})
