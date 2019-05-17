import React from 'react'
import { connect } from 'react-redux'
import { useAlert } from 'react-alert'
import { reduxForm, Field } from 'redux-form'
import { Col, Form, ButtonGroup, Button } from 'reactstrap'
import styled from 'styled-components'
import { isNil, compose, is, and, equals } from 'ramda'

import Select from './Select'
import CustomOption from './CustomOption'
import Loader from '../../styled/Loader'
import { votePoll } from '../../../state/actions'
import { COLOURS } from '../../../constants'

const PollHeading = styled.h1`
	font-size: 1.5rem;
	margin-bottom: 1rem;

	@media (max-width: 575px) {
		font-size: 2.5rem;
		margin-bottom: 1.5rem;
		text-align: center;
	}
`

const Buttons = styled(ButtonGroup)`
	display: block;
`

const TweetButton = styled(Button)`
	color: ${COLOURS.twitter};
	border-color: ${COLOURS.twitter};

	&:hover,
	&:active {
		background-color: ${COLOURS.twitter};
		border-color: ${COLOURS.twitter};
	}

	&:focus {
		box-shadow: 0 0 0 3px ${COLOURS.twitterShadow};
	}
`

const VoteForm = ({ poll, handleSubmit, auth, form, toggle, votePoll }) => {
	const alert = useAlert()

	// Render loader if poll data haven't been received
	if (isNil(poll)) {
		return (
			<Col xs="12">
				<Loader />
			</Col>
		)
	}

	const { pollQuestion, pollOptions } = poll

	const submit = values =>
		votePoll({
			values,
			poll,
			alert,
		})

	const isCustomOption = values =>
		is(Object, values) && equals(values.selection, "I'd like a custom option")

	const isOwnPoll = (auth, poll) =>
		is(Object, auth) && equals(poll.userId, auth._id)

	const tweet = () => {
		const url = `https://twitter.com/intent/tweet?text=Come%20vote%20on%20my%20poll!%20-%20${pollQuestion}%0A${
			window.location
		}`
		window.open(
			url,
			'twitter',
			'location,status,scrollbars,resizable,width=640, height=250,left=320,top=125'
		)
	}

	return (
		<Col xs="12" sm="4">
			<PollHeading>{pollQuestion}</PollHeading>
			<Form onSubmit={handleSubmit(submit)} id="vote">
				<Field
					name="selection"
					type="select"
					label="I want to vote for..."
					pollOptions={pollOptions}
					auth={auth}
					component={Select}
				/>
				{and(
					isCustomOption(form.vote.values),
					<Field
						name="customSelection"
						type="text"
						label="Vote with my own option:"
						placeholder="Custom option"
						component={CustomOption}
					/>
				)}
				<Buttons vertical>
					<Button outline color="success">
						Submit
					</Button>
					{and(
						isOwnPoll(auth, poll),
						<>
							<TweetButton outline onClick={tweet}>
								Tweet
							</TweetButton>
							<Button outline onClick={toggle} color="danger">
								Delete
							</Button>
						</>
					)}
				</Buttons>
			</Form>
		</Col>
	)
}

const validate = ({ selection, customSelection }) => {
	const errors = {}
	if (!selection) errors.selection = 'Please select an option'

	if (selection === "I'd like a custom option" && !customSelection) {
		errors.customSelection = 'Please enter your custom selection'
	}
	return errors
}

const mapStateToProps = ({ poll, form, auth }) => ({ poll, form, auth })

export default compose(
	reduxForm({ form: 'vote', validate }),
	connect(
		mapStateToProps,
		{ votePoll }
	)
)(VoteForm)
