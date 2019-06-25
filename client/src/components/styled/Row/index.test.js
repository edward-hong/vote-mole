import React from 'react'
import { render } from '@testing-library/react'

import Row from '.'

describe('Row', () => {
	it('renders correctly', () => {
		const {
			container: { firstChild: element },
		} = render(
			<Row>
				<div />
			</Row>,
		)

		expect(element).toMatchSnapshot()
	})
})
