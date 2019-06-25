import React from 'react'
import { render } from '@testing-library/react'

import PrivacyPolicy from '.'

describe('PrivacyPolicy', () => {
	it('renders correctly', () => {
		const {
			container: { firstChild: element },
		} = render(<PrivacyPolicy />)

		expect(element).toMatchSnapshot()
	})
})
