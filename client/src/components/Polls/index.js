import React from 'react'
import { ListGroup } from 'reactstrap'
import styled from 'styled-components'
import { equals, and, isNil, map } from 'ramda'

import Loader from '../styled/Loader'
import PollListItem from '../styled/PollListItem'

// Ensure list of polls have fixed height
const PollList = styled(ListGroup)`
	height: 276px;
`

const Polls = ({ count, polls }) => {
	// Render loader when data haven't been fetched yet
	if (and(isNil(count), isNil(polls))) {
		return <Loader />
	}

	// Render message if there are no polls
	if (equals(count, 0)) {
		return (
			<div>
				There aren't any polls yet. Login and click 'Add Poll' in the navigation
				to add a poll.
			</div>
		)
	}

	// Render list of polls
	return (
		<PollList>
			{map(
				({ id, pollQuestion }) => (
					<PollListItem key={id} id={id} question={pollQuestion} />
				),
				polls,
			)}
		</PollList>
	)
}

export default Polls
