import React from 'react'
import { ListGroup } from 'reactstrap'
import styled from 'styled-components'
import { equals, and, isNil, map } from 'ramda'

import Loader from '../styled/Loader'
import PollListItem from '../styled/PollListItem'

const PollList = styled(ListGroup)`
	height: 276px;
`

const Polls = ({ count, polls }) => {
	if (and(isNil(count), isNil(polls))) {
		return <Loader />
	}

	if (equals(count, 0)) {
		return (
			<div>
				There aren't any polls yet. Login and click 'Add Poll' in the navigation
				to add a poll.
			</div>
		)
	}
	return (
		<PollList>
			{map(
				({ id, pollQuestion }) => (
					<PollListItem key={id} id={id} question={pollQuestion} />
				),
				polls
			)}
		</PollList>
	)
}

export default Polls
