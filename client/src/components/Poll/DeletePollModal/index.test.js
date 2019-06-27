import React from 'react'
import { fireEvent } from '@testing-library/react'
import { from } from 'rxjs'
import { ajax } from 'rxjs/ajax'

import DeletePollModal from '.'
import renderWithRouter from '../../../utils/test/renderWithRouter'

const resolvePromise = new Promise((resolve, reject) => {
	resolve({ response: { status: 'resolved' } })
})
const rejectPromise = status =>
	new Promise((resolve, reject) => {
		reject({ status })
	})

jest.mock('rxjs/ajax', () => ({
	ajax: jest.fn(),
}))

ajax.mockImplementationOnce(() => from(resolvePromise))
ajax.mockImplementationOnce(() => from(rejectPromise(600)))
ajax.mockImplementationOnce(() => from(rejectPromise(400)))

describe('DeletePollModal', () => {
	it('is null when `isOpen` is false', () => {
		const { container } = renderWithRouter(<DeletePollModal isOpen={false} />)

		expect(container.firstChild).toBeNull()
	})

	it('renders correctly when `isOpen` is true', () => {
		const { container } = renderWithRouter(<DeletePollModal isOpen={true} />)

		expect(container.firstChild).toMatchSnapshot()
	})

	it('calls delete poll handler when the `Delete` button is clicked', () => {
		const history = {
			push: jest.fn(),
			listen: () => {},
			location: { pathname: '/poll' },
		}
		const { getByText } = renderWithRouter(
			<DeletePollModal isOpen={true} toggle={() => {}} userId="123" />,
			{ route: '/poll', history },
		)

		fireEvent.click(getByText('Delete'))

		expect(ajax).toHaveBeenCalled()
	})

	it('calls delete poll handler when the `Delete` button is clicked but the handler returns an error', () => {
		const { getByText } = renderWithRouter(
			<DeletePollModal isOpen={true} toggle={() => {}} userId="123" />,
		)

		fireEvent.click(getByText('Delete'))

		expect(ajax).toHaveBeenCalled()
	})

	it('calls delete poll handler when the `Delete` button is clicked but the handler returns an error status 400', () => {
		const { getByText } = renderWithRouter(
			<DeletePollModal isOpen={true} toggle={() => {}} userId="123" />,
		)

		fireEvent.click(getByText('Delete'))

		expect(ajax).toHaveBeenCalled()
	})

	it('calls toggle when the `Cancel` button is clicked', () => {
		const toggle = jest.fn()
		const { getByText } = renderWithRouter(
			<DeletePollModal isOpen={true} toggle={toggle} />,
		)

		fireEvent.click(getByText('Cancel'))

		expect(toggle).toHaveBeenCalled()
	})
})
