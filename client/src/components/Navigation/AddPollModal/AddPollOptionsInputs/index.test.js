import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { reduxForm } from 'redux-form'

import AddPollOptionsInputs from '.'
import renderWithRedux from '../../../../utils/test/renderWithRedux'

describe('AddPollOptionsInputs', () => {
	it('shows error message when there is an error', () => {
		const error = 'Please fill this field'
		const { getByText } = render(
			<AddPollOptionsInputs meta={{ pristine: false, error }} fields={[]} />,
		)

		expect(getByText(error)).toBeInTheDocument()
	})

	it('renders correctly', () => {
		const EnhancedComponent = reduxForm({ form: 'add_poll' })(
			AddPollOptionsInputs,
		)
		const { container } = renderWithRedux(
			<EnhancedComponent
				meta={{ pristine: true, error: false }}
				fields={['test1', 'test2']}
			/>,
		)

		expect(container.firstChild).toMatchSnapshot()
	})

	it('calls the add option handler when the add option button is clicked', () => {
		const EnhancedComponent = reduxForm({ form: 'add_poll' })(
			AddPollOptionsInputs,
		)
		const fields = ['test1', 'test2']
		fields.push = jest.fn()
		const { getByText } = renderWithRedux(
			<EnhancedComponent
				meta={{ pristine: true, error: false }}
				fields={fields}
			/>,
		)
		const addOptionButton = getByText('Add Option')

		fireEvent.click(addOptionButton)

		expect(fields.push).toHaveBeenCalled()
	})
})
