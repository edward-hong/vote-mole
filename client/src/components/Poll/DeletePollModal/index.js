import React from 'react'
import { useAlert } from 'react-alert'
import { withRouter } from 'react-router-dom'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { ajax } from 'rxjs/ajax'
import { equals } from 'ramda'

import BlackButton from '../../styled/BlackButton'
import { POLL_DELETE_PATH, HOME_PATH } from '../../../constants'

const DeletePollModal = ({ isOpen, toggle, history, userId }) => {
	const alert = useAlert()

	const deletePoll = id => () => {
		ajax({
			url: `${POLL_DELETE_PATH}${id}`,
			method: 'DELETE',
		}).subscribe(
			({ response: { status } }) => {
				history.push(HOME_PATH)
				alert.success(status)
			},
			({ status }) => {
				if (equals(status, 400)) {
					alert.error('Poll not found')
				}
			},
		)
		toggle()
	}

	return (
		<Modal isOpen={isOpen} toggle={toggle}>
			<ModalHeader>Delete Poll</ModalHeader>
			<ModalBody>Are you sure you want to delete this poll?</ModalBody>
			<ModalFooter>
				<Button outline color="danger" onClick={deletePoll(userId)}>
					Delete
				</Button>{' '}
				<BlackButton outline onClick={toggle}>
					Cancel
				</BlackButton>
			</ModalFooter>
		</Modal>
	)
}

export default withRouter(DeletePollModal)
