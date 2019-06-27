import React from 'react'
import { Link } from 'react-router-dom'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from 'reactstrap'
import styled from 'styled-components'

import NavItems from './NavItems'
import LoginModal from './LoginModal'
import AddPollModal from './AddPollModal'
import useModal from '../../hooks/useModal'
import { HOME_PATH, COLOURS } from '../../constants'

const NavigationBar = styled(Navbar)`
	margin-bottom: 2rem;
	border-bottom: 1px solid ${COLOURS.primary};
`

const CollapsibleItems = styled(Collapse)`
	flex-direction: row-reverse;
`

const Hamburger = styled(NavbarToggler)`
	&& {
		color: ${COLOURS.primary};
		border-color: ${COLOURS.primary};
		width: 56px;
		height: 40px;
		position: relative;
		line-height: 50px;

		/* hamburger animation */
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

const Navigation = () => {
	const [isExpandNav, toggleExpandNav] = useModal()
	const [isOpenLogin, toggleLogin] = useModal()
	const [isOpenAddPoll, toggleAddPoll] = useModal()

	return (
		<NavigationBar light expand="md">
			{/* Logo and App Name */}
			<NavbarBrand tag={Link} to={HOME_PATH}>
				<img
					src="https://res.cloudinary.com/avatarhzh/image/upload/v1509887327/build-a-voting-app/logo.svg"
					alt="vote mole logo"
				/>
				VoteMole
			</NavbarBrand>

			{/* Hamburger icon for smaller screens */}
			<Hamburger active={isExpandNav ? 1 : 0} onClick={toggleExpandNav} />
			<CollapsibleItems isOpen={isExpandNav} navbar>
				<Nav navbar>
					<NavItems toggleLogin={toggleLogin} toggleAddPoll={toggleAddPoll} />
				</Nav>
			</CollapsibleItems>
			<LoginModal isOpen={isOpenLogin} toggle={toggleLogin} />
			<AddPollModal
				isOpen={isOpenAddPoll}
				toggle={toggleAddPoll}
				setExpandNav={toggleExpandNav}
			/>
		</NavigationBar>
	)
}

export default Navigation
