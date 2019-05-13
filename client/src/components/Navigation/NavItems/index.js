import React from 'react'
import { connect } from 'react-redux'
import { NavLink, NavItem } from 'reactstrap'
import styled from 'styled-components'
import { isNil } from 'ramda'

import { AUTH_LOGOUT_PATH } from '../../../constants'

const NavLinkItem = styled(NavItem)`
	text-align: center;
`

// Render nothing if user info hasn't been fetched from backend
// Then conditionally render NavItems depending on whether user is logged in
const NavItems = ({ toggleLogin, toggleAddPoll, isLoggedIn }) =>
	isNil(isLoggedIn) ? null : isLoggedIn ? (
		<>
			<NavLink href="#" onClick={toggleAddPoll}>
				<NavLinkItem>Add Poll</NavLinkItem>
			</NavLink>
			<NavLink href={AUTH_LOGOUT_PATH}>
				<NavLinkItem>Logout</NavLinkItem>
			</NavLink>
		</>
	) : (
		<NavLink href="#" onClick={toggleLogin}>
			<NavLinkItem>Login</NavLinkItem>
		</NavLink>
	)

const mapStateToProps = ({ auth }) => ({ isLoggedIn: auth })

export default connect(mapStateToProps)(NavItems)
