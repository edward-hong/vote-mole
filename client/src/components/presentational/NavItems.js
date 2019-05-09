import React from 'react'
import { connect } from 'react-redux'
import { NavLink, NavItem } from 'reactstrap'
import styled from 'styled-components'
import { isNil } from 'ramda'

const NavLinkItem = styled(NavItem)`
	text-align: center;
`

const NavItems = ({ toggleLogin, toggleAddPoll, isLoggedIn }) =>
	isNil(isLoggedIn) ? null : isLoggedIn ? (
		<>
			<NavLink href="#" onClick={toggleAddPoll}>
				<NavLinkItem>Add Poll</NavLinkItem>
			</NavLink>
			<NavLink href="/auth/logout">
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
