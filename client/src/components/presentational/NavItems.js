import React from 'react'
import { connect } from 'react-redux'
import { NavLink, NavItem } from 'reactstrap'
import styled from 'styled-components'

const NavLinkItem = styled(NavItem)`
	text-align: center;
`

const NavItems = ({ toggleLogin, isLoggedIn }) => {
	switch (isLoggedIn) {
		case null:
			return null
		case false:
			return (
				<NavLink href="#" onClick={toggleLogin}>
					<NavLinkItem>Login</NavLinkItem>
				</NavLink>
			)
		default:
			return (
				<NavLink href="/auth/logout">
					<NavLinkItem>Logout</NavLinkItem>
				</NavLink>
			)
	}
}

const mapStateToProps = ({ auth }) => ({ isLoggedIn: auth })

export default connect(mapStateToProps)(NavItems)
