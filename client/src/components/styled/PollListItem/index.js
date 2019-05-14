import React from 'react'
import { ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { COLOURS, POLL_BRANCH_PATH } from '../../../constants'

const ListItem = styled(ListGroupItem)`
	height: 3.5rem;
	padding: 0;
	border-color: ${COLOURS.primary};
`

const ListItemLink = styled(Link)`
	display: block;
	margin: 0;
	width: 100%;
	height: 100%;
	text-align: center;
	color: ${COLOURS.primary};
	line-height: 3.5rem;

	&:hover {
		color: white;
		background-color: ${COLOURS.primary};
		text-decoration: none;
		transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
	}
`

const PollListItem = ({ id, question }) => (
	<ListItem>
		<ListItemLink to={`${POLL_BRANCH_PATH}${id}`}>{question}</ListItemLink>
	</ListItem>
)

export default PollListItem
