import React from 'react'

import NavItems from '.'
import renderWithRedux from '../../../utils/test/renderWithRedux'
import renderWithRouterAndRedux from '../../../utils/test/renderWithRouterAndRedux'

describe('NavItems', () => {
	it('returns null when `auth` state is null', () => {
		const { container } = renderWithRedux(
			<NavItems toggleAddPoll={() => {}} toggleLogin={() => {}} />,
			{ initialState: { auth: null } },
		)

		expect(container.firstChild).toBeNull()
	})

	it('renders correctly when `auth` state is false', () => {
		const { container } = renderWithRouterAndRedux(
			<NavItems toggleAddPoll={() => {}} toggleLogin={() => {}} />,
			{ initialState: { auth: false } },
		)

		expect(container.firstChild).toMatchSnapshot()
	})

	it('renders correctly when `auth` state is true', () => {
		const auth = {
			_id: '5cd19682498a98c6962f34c1',
			profileID: '111881712224957728911',
		}
		const { container } = renderWithRouterAndRedux(
			<NavItems toggleAddPoll={() => {}} toggleLogin={() => {}} />,
			{ initialState: { auth } },
		)

		expect(container.firstChild).toMatchSnapshot()
	})
})
