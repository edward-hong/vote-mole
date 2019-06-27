import React from 'react'
import { render } from '@testing-library/react'

import FormField from '.'

describe('FormField', () => {
	it('shows error message when there is an error', () => {
		const error = 'Please fill this field'
		const { getByText } = render(
			<FormField input={{ name: 'field' }} meta={{ touched: true, error }} />,
		)

		expect(getByText(error)).toBeInTheDocument()
	})

	it('renders correctly when valid', () => {
		const { container } = render(
			<FormField
				input={{ name: 'field' }}
				meta={{ touched: true, error: false }}
			/>,
		)

		expect(container.firstChild).toMatchSnapshot()
	})

	it('renders correctly when untouched', () => {
		const { container } = render(
			<FormField
				input={{ name: 'customOption' }}
				meta={{ touched: false, error: false }}
			/>,
		)

		expect(container.firstChild).toMatchSnapshot()
	})
})
