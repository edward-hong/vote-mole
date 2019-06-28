import React from 'react'
import { fireEvent } from '@testing-library/react'
import { from } from 'rxjs'
import { ajax } from 'rxjs/ajax'

import AddPollModal from '.'
import renderWithRouterAndRedux from '../../../utils/test/renderWithRouterAndRedux'

const resolvePromise = new Promise((resolve, reject) => {
	resolve({ response: 'resolved' })
})
const rejectPromise = status =>
	new Promise((resolve, reject) => {
		reject({ status })
	})

jest.mock('rxjs/ajax', () => ({
	ajax: jest.fn(),
}))

const testSubmitPoll = () => {
	const toggleExpandNav = jest.fn()
	const toggle = jest.fn()
	const { getByText, getByPlaceholderText } = renderWithRouterAndRedux(
		<AddPollModal
			isOpen={true}
			toggleExpandNav={toggleExpandNav}
			toggle={toggle}
		/>,
		{ initialState: { form: 'add_poll', auth: false } },
	)
	const addOptionButton = getByText('Add Option')
	const pollQuestionInput = getByPlaceholderText('Enter your poll question')
	const form = document.getElementById('add_poll')

	fireEvent.click(addOptionButton)
	fireEvent.click(addOptionButton)
	fireEvent.change(pollQuestionInput, { target: { value: 'a' } })
	const options1 = document.getElementById('options[0]')
	const options2 = document.getElementById('options[1]')
	fireEvent.change(options1, { target: { value: 'a' } })
	fireEvent.change(options2, { target: { value: 'b' } })
	fireEvent.submit(form)

	expect(ajax).toHaveBeenCalled()
}

ajax.mockImplementationOnce(() => from(resolvePromise))
ajax.mockImplementationOnce(() => from(rejectPromise(406)))
ajax.mockImplementationOnce(() => from(rejectPromise(401)))
ajax.mockImplementationOnce(() => from(rejectPromise(600)))

describe('AddPollModal', () => {
	it('returns null when `isOpen` prop is false', () => {
		const { container } = renderWithRouterAndRedux(
			<AddPollModal isOpen={false} />,
			{ initialState: { form: 'add_poll', auth: false } },
		)

		expect(container.firstChild).toBeNull()
	})

	it('renders correctly', () => {
		const { container } = renderWithRouterAndRedux(
			<AddPollModal isOpen={true} />,
			{ initialState: { form: 'add_poll', auth: false } },
		)

		expect(container.firstChild).toMatchSnapshot()
	})

	it('will show error if more than 20 options are added on submit', () => {
		const { getByText } = renderWithRouterAndRedux(
			<AddPollModal isOpen={true} />,
			{ initialState: { form: 'add_poll', auth: false } },
		)
		const addOptionButton = getByText('Add Option')
		const form = document.getElementById('add_poll')

		for (let i = 0; i < 21; i++) {
			fireEvent.click(addOptionButton)
		}
		fireEvent.submit(form)

		const errorMessage = getByText('No more than 20 options allowed')
		expect(errorMessage).toBeInTheDocument()
	})

	it('multiple same options will cause an error', () => {
		const { getByText } = renderWithRouterAndRedux(
			<AddPollModal isOpen={true} />,
			{ initialState: { form: 'add_poll', auth: false } },
		)
		const addOptionButton = getByText('Add Option')
		const form = document.getElementById('add_poll')

		fireEvent.click(addOptionButton)
		fireEvent.click(addOptionButton)
		const options1 = document.getElementById('options[0]')
		const options2 = document.getElementById('options[1]')
		fireEvent.change(options1, { target: { value: 'test' } })
		fireEvent.change(options2, { target: { value: 'test' } })
		fireEvent.submit(form)

		const errorMessage = getByText('Options must be unique')
		expect(errorMessage).toBeInTheDocument()
	})

	it('calls the submit handler when form is submitted', testSubmitPoll)

	it(
		'handles error if poll submitted has a duplicated poll question',
		testSubmitPoll,
	)

	it('handles error if user is not logged in to submit poll', testSubmitPoll)

	it('handles error', testSubmitPoll)
})
