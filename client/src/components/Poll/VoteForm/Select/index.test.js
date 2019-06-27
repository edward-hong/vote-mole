import React from 'react'
import { render } from '@testing-library/react'

import Select from '.'

const pollOptions = [
	{
		votes: 3,
		option: 'English',
	},
	{
		votes: 6,
		option: 'French',
	},
	{
		votes: 9,
		option: 'German',
	},
	{
		votes: 5,
		option: 'Russian',
	},
]

describe('Select', () => {
	it('shows error message when there is an error', () => {
		const error = 'Please make a selection'
		const { getByText } = render(
			<Select
				input={{ name: 'select' }}
				meta={{ touched: true, error }}
				pollOptions={pollOptions}
				type="select"
			/>,
		)

		expect(getByText(error)).toBeInTheDocument()
	})

	it('renders correctly when valid', () => {
		const { container } = render(
			<Select
				input={{ name: 'select' }}
				meta={{ touched: true, error: false }}
				pollOptions={pollOptions}
				type="select"
			/>,
		)

		expect(container.firstChild).toMatchSnapshot()
	})

	it('renders correctly when untouched', () => {
		const { container } = render(
			<Select
				input={{ name: 'select' }}
				meta={{ touched: false, error: false }}
				pollOptions={pollOptions}
				type="select"
			/>,
		)

		expect(container.firstChild).toMatchSnapshot()
	})
})
