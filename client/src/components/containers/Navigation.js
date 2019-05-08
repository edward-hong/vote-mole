import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { not } from 'ramda'
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
} from 'reactstrap'
import styled from 'styled-components'

import { HOME_PATH, COLOURS } from '../../constants'

const NavigationBar = styled(Navbar)`
	margin-bottom: 2rem;
	border-bottom: 1px solid ${COLOURS.primary};
`

const Hamburger = styled(NavbarToggler)`
	&& {
		color: ${COLOURS.primary};
		border-color: ${COLOURS.primary};
		width: 56px;
		height: 40px;
		position: relative;
		line-height: 50px;

		span {
			background-image: none;
			width: 30px;
			height: 2px;
			background-color: ${({ active }) =>
				active ? 'transparent' : COLOURS.primary};
			position: absolute;
			transform: translate(-50%, -50%);

			&:before,
			&:after {
				content: '';
				position: absolute;
				width: 30px;
				height: 2px;
				background-color: ${COLOURS.primary};
				left: -0.0001%;
				transition: 0.2s;
			}

			&:before {
				top: ${({ active }) => (active ? 0 : '-8px')};
				transform: ${({ active }) => (active ? 'rotate(135deg)' : 'none')};
			}

			&:after {
				top: ${({ active }) => (active ? 0 : '8px')};
				transform: ${({ active }) => (active ? 'rotate(45deg)' : 'none')};
			}
		}
	}
`

const NavLinkItem = styled(NavItem)`
	text-align: center;
`

const Navigation = () => {
	const [expandNav, setExpandNav] = useState(false)

	const handleToggleNav = () => setExpandNav(not(expandNav))

	return (
		<NavigationBar light expand="md">
			<NavbarBrand tag={Link} to={HOME_PATH}>
				<img
					src="https://res.cloudinary.com/avatarhzh/image/upload/v1509887327/build-a-voting-app/logo.svg"
					alt="vote mole logo"
				/>
				VoteMole
			</NavbarBrand>
			<Hamburger active={expandNav} onClick={handleToggleNav} />
			<Collapse isOpen={expandNav} navbar>
				<Nav navbar>
					<NavLink href="#">
						<NavLinkItem>Login</NavLinkItem>
					</NavLink>
				</Nav>
			</Collapse>
		</NavigationBar>
	)
}

export default Navigation
