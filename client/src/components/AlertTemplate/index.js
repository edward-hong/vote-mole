import React from 'react'
import styled from 'styled-components'
import FontAwesome from 'react-fontawesome'
import { equals } from 'ramda'

import { COLOURS } from '../../constants'

const Alert = styled.div`
	width: 300px;
	border: 1px solid
		${({ type }) => (equals(type, 'success') ? COLOURS.success : COLOURS.error)};
	color: ${({ type }) =>
		equals(type, 'success') ? COLOURS.success : COLOURS.error};
	border-radius: 0.25rem;
	padding: 20px;
	padding-left: 40px;
	background-color: white;
`

const Close = styled.button`
	display: inline-block;
	border: none;
	margin: 0;
	text-decoration: none;
	background: transparent;
	color: ${({ type }) =>
		equals(type, 'success') ? COLOURS.success : COLOURS.error};
	font-family: sans-serif;
	font-size: 1rem;
	position: absolute;
	top: 15px;
	right: 15px;
	cursor: pointer;
	text-align: center;
	transition: background 250ms ease-in-out, transform 150ms ease;
	-webkit-appearance: none;
	-moz-appearance: none;
`
const StatusIcon = styled(FontAwesome)`
	display: inline-block;
	position: absolute;
	left: 25px;
	top: 36px;
`

const AlertTemplate = ({ style, options, message, close }) => (
	<Alert type={options.type} style={style}>
		<StatusIcon
			name={
				equals(options.type, 'success')
					? 'check-circle'
					: 'exclamation-triangle'
			}
		/>
		{message}
		<Close type={options.type} onClick={close}>
			<FontAwesome name="close" />
		</Close>
	</Alert>
)

export default AlertTemplate
