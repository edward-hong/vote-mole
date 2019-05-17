import React, { useEffect, useState } from 'react'
import { ajax } from 'rxjs/ajax'
import { connect } from 'react-redux'
import { useAlert } from 'react-alert'
import { withRouter } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import styled from 'styled-components'
import { not, compose, equals } from 'ramda'

import VoteForm from './VoteForm'
import Graph from './Graph'
import DeletePollModal from './DeletePollModal'
import { fetchPoll, clearPoll } from '../../state/actions'
import { POLL_DELETE_PATH, HOME_PATH } from '../../constants'

const GraphContainer = styled(Col)`
	@media (max-width: 575px) {
		margin-top: 1.5rem;
	}
`

const Poll = ({ match, fetchPoll, clearPoll, history }) => {
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		// fetch poll data using id from url
		fetchPoll(match.params.id)

		return () => {
			clearPoll()
		}
	}, [fetchPoll, match, clearPoll])

	const alert = useAlert()

	const toggle = () => setIsOpen(not(isOpen))

	const deletePoll = id => () => {
		ajax({
			url: `${POLL_DELETE_PATH}${id}`,
			method: 'DELETE',
		}).subscribe(
			({ response: { status } }) => {
				alert.success(status)
				history.push(HOME_PATH)
			},
			({ status }) => {
				if (equals(status, 400)) {
					alert.error('Poll not found')
				}
			}
		)
		toggle()
	}

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
				deletePoll={deletePoll(match.params.id)}
			/>
		</Container>
	)
}

export default compose(
	connect(
		null,
		{ fetchPoll, clearPoll }
	),
	withRouter
)(Poll)
