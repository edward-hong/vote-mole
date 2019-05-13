import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field, FieldArray } from 'redux-form'
import { useAlert } from 'react-alert'
import { withRouter } from 'react-router-dom'
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Form,
} from 'reactstrap'
import { ajax } from 'rxjs/ajax'
import { compose, or, map, equals } from 'ramda'

import AddPollQuestionInput from './AddPollQuestionInput'
import AddPollOptionsInputs from './AddPollOptionsInputs'
import BlackButton from '../../styled/BlackButton'
import { POLL_SUBMIT_PATH, POLL_BRANCH_PATH } from '../../../constants'

const AddPollModal = ({
	isOpen,
	toggle,
	reset,
	handleSubmit,
	pristine,
	submitting,
	auth,
	history,
}) => {
	const alert = useAlert()

	const cancel = () => {
		reset()
		toggle()
	}

	// Submit poll to backend
	const submit = ({ pollQuestion, options }) =>
		ajax({
			url: POLL_SUBMIT_PATH,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: {
				userID: auth._id,
				pollQuestion: pollQuestion,
				pollOptions: map(option => ({ option }), options),
			},
		}).subscribe(
			({ response }) => {
				cancel()
				history.push(`${POLL_BRANCH_PATH}${response}`)
				alert.success('Poll submitted!')
			},
			({ status }) => {
				toggle()
				if (equals(status, 406)) {
					alert.error(
						'Submit failed: You already have a poll asking the same question'
					)
				} else if (equals(status, 401)) {
					alert.error(
						'Submit faild: You are unauthorized to create a poll. Please login'
					)
				}
			}
		)

	return (
		<Modal isOpen={isOpen} toggle={toggle}>
			<ModalHeader toggle={cancel}>Add Poll</ModalHeader>
			<ModalBody>
				<Form onSubmit={handleSubmit(submit)} id="add_poll">
					<Field
						name="pollQuestion"
						type="text"
						label="Poll Question"
						placeholder="Enter your poll question"
						component={AddPollQuestionInput}
					/>
					<FieldArray name="options" component={AddPollOptionsInputs} />
				</Form>
			</ModalBody>
			<ModalFooter>
				<Button outline type="submit" form="add_poll" color="success">
					Submit
				</Button>{' '}
				<Button
					outline
					color="secondary"
					disabled={or(pristine, submitting)}
					onClick={reset}>
					Clear Values
				</Button>
				<BlackButton outline onClick={cancel}>
					Cancel
				</BlackButton>
			</ModalFooter>
		</Modal>
	)
}

// Validate add poll form
const validate = ({ pollQuestion, options }) => {
	const errors = {}

	if (!pollQuestion) errors.pollQuestion = 'Poll question is required'

	if (!options || options.length < 2) {
		errors.options = ['Poll must have at least 2 options']
	} else if (options && options.length > 20) {
		errors.options = ['No more than 20 options allowed']
	} else {
		const optionsArrayErrors = []
		options.forEach((option, i) => {
			if (!option || !option.length) {
				optionsArrayErrors[i] = 'Please fill out all options fields'
			}
		})
		if (optionsArrayErrors.length) {
			errors.options = optionsArrayErrors
		}
	}

	if (options && options[0]) {
		const unique = [...new Set(options)]
		if (unique.length !== options.length) {
			errors.options = ['Options must be unique']
		}
	}

	return errors
}

const mapStateToProps = ({ form, auth }) => ({ form, auth })

export default compose(
	reduxForm({ form: 'add_poll', validate }),
	connect(mapStateToProps),
	withRouter
)(AddPollModal)
