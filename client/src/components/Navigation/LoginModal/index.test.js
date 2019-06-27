import React from 'react'
import { render } from '@testing-library/react'

import LoginModal from '.'

describe('LoginModal', () => {
	it('returns null when `isOpen` prop is false', () => {
		const { container } = render(
			<LoginModal isOpen={false} toggle={() => {}} />,
		)

		expect(container.firstChild).toBeNull()
	})

	it('renders correctly when `isOpen` props is true', () => {
		const { container } = render(<LoginModal isOpen={true} toggle={() => {}} />)

		expect(container.firstChild).toMatchSnapshot()
	})
})
