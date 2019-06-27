import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import AddPollExtraOptionInput from '.'

describe('AddPollExtraOptionInput', () => {
	it('shows error message when there is an error', () => {
		const error = 'Please fill out all options fields'
		const { getByText } = render(
			<AddPollExtraOptionInput
				input={{ name: 'field' }}
				meta={{ touched: true, error }}
				index={0}
				deleteOption={() => {}}
			/>,
		)

		expect(getByText(error)).toHaveTextContent(error)
	})

	it('renders correctly when valid', () => {
		const { container } = render(
			<AddPollExtraOptionInput
				input={{ name: 'field' }}
				meta={{ touched: true, error: false }}
				index={0}
				deleteOption={() => {}}
			/>,
		)

		expect(container.firstChild).toMatchSnapshot()
	})

	it('renders correctly when untouched', () => {
		const { container } = render(
			<AddPollExtraOptionInput
				input={{ name: 'field' }}
				meta={{ touched: false, error: false }}
				index={0}
				deleteOption={() => {}}
			/>,
		)

		expect(container.firstChild).toMatchSnapshot()
	})

	it('calls delete handler when delete button is clicked', () => {
		const deleteOption = jest.fn()
		const index = 0
		const { container } = render(
			<AddPollExtraOptionInput
				input={{ name: 'field' }}
				meta={{ touched: false, error: false }}
				index={index}
				deleteOption={deleteOption}
			/>,
		)
		const deleteButton = container.getElementsByTagName('button')[0]

		fireEvent.click(deleteButton)

		expect(deleteOption).toHaveBeenCalledWith(index)
	})
})
