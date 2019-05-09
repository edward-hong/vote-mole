import React from 'react'
import { Modal, ModalBody, Button } from 'reactstrap'
import styled from 'styled-components'

import { COLOURS, AUTH_GOOGLE_LOGIN_PATH } from '../../constants'

const GoogleLoginButton = styled(Button)`
	color: ${COLOURS.google};
	border-color: ${COLOURS.google};

	&:hover,
	&:active {
		background-color: ${COLOURS.google};
		border-color: ${COLOURS.google};
	}

	&:focus {
		box-shadow: 0 0 0 3px ${COLOURS.googleShadow};
	}
`

const LoginModal = ({ isOpen, toggle }) => (
	<Modal isOpen={isOpen} toggle={toggle}>
		<ModalBody>
			<GoogleLoginButton
				href={AUTH_GOOGLE_LOGIN_PATH}
				className="btn-google"
				outline
				block>
				Login with Google
			</GoogleLoginButton>
		</ModalBody>
	</Modal>
)

export default LoginModal
