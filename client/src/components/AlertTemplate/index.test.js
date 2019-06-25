import React from 'react'
import { render } from '@testing-library/react'

import AlertTemplate from '.'

describe('AlertTemplate', () => {
	it('success alert message renders correctly', () => {
		const { container } = render(
			<AlertTemplate
				style={{}}
				options={{ type: 'success' }}
				message="Success Message"
				close={() => {}}
			/>,
		)

		expect(container.firstChild).toMatchSnapshot()
	})

	it('error alert message renders correctly', () => {
		const { container } = render(
			<AlertTemplate
				style={{}}
				options={{ type: 'error' }}
				message="Error Message"
				close={() => {}}
			/>,
		)

		expect(container.firstChild).toMatchSnapshot()
	})
})
