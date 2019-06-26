import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import DeletePollModal from '.'

describe('DeletePollModal', () => {
	it('is null when `isOpen` is false', () => {
		const { container } = render(<DeletePollModal isOpen={false} />)

		expect(container.firstChild).toBeNull()
	})

	it('renders correctly when `isOpen` is true', () => {
		const { container } = render(<DeletePollModal isOpen={true} />)

		expect(container.firstChild).toMatchSnapshot()
	})

	it('calls delete poll handler when the `Delete` button is clicked', () => {
		const deletePoll = jest.fn()
		const { getByText } = render(
			<DeletePollModal isOpen={true} deletePoll={deletePoll} />,
		)

		fireEvent.click(getByText('Delete'))

		expect(deletePoll).toHaveBeenCalled()
	})

	it('calls toggle when the `Cancel` button is clicked', () => {
		const toggle = jest.fn()
		const { getByText } = render(
			<DeletePollModal isOpen={true} toggle={toggle} />,
		)

		fireEvent.click(getByText('Cancel'))

		expect(toggle).toHaveBeenCalled()
	})
})
