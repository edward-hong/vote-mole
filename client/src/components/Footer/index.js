import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Footer = styled.footer`
	text-align: center;
	margin: 3rem auto 1.5rem;
`

const FooterComponent = () => (
	<Footer>
		Made by Edward Hong | <Link to="/privacy-policy">Privacy Policy</Link>
	</Footer>
)

export default FooterComponent
