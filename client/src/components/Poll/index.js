import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import styled from 'styled-components'

import VoteForm from './VoteForm'
import Graph from './Graph'
import DeletePollModal from './DeletePollModal'
import useModal from '../../hooks/useModal'
import { fetchPoll, clearPoll } from '../../state/actions'

const GraphContainer = styled(Col)`
	@media (max-width: 575px) {
		margin-top: 1.5rem;
	}
`

const Poll = ({ match, fetchPoll, clearPoll }) => {
	const [isOpen, toggle] = useModal()

	useEffect(() => {
		// fetch poll data using id from url
		fetchPoll(match.params.id)

		return () => {
			clearPoll()
		}
	}, [fetchPoll, match, clearPoll])

	return (
		<Container fluid>
			<Row>
				<VoteForm toggle={toggle} />
				<GraphContainer sm="8" xs="12">
					<Graph />
				</GraphContainer>
			</Row>
			<DeletePollModal
				isOpen={isOpen}
				toggle={toggle}
				userId={match.params.id}
			/>
		</Container>
	)
}

export default connect(
	null,
	{ fetchPoll, clearPoll },
)(Poll)
