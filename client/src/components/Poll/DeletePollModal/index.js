import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

import BlackButton from '../../styled/BlackButton'

const DeletePollModal = ({ isOpen, toggle, deletePoll }) => (
	<Modal isOpen={isOpen} toggle={toggle}>
		<ModalHeader>Delete Poll</ModalHeader>
		<ModalBody>Are you sure you want to delete this poll?</ModalBody>
		<ModalFooter>
			<Button outline color="danger" onClick={deletePoll}>
				Delete
			</Button>{' '}
			<BlackButton outline onClick={toggle}>
				Cancel
			</BlackButton>
		</ModalFooter>
	</Modal>
)

export default DeletePollModal
