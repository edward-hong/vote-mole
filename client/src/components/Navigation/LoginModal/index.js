import React from 'react'
import { Modal, ModalBody, Button } from 'reactstrap'
import styled from 'styled-components'

import {
	COLOURS,
	AUTH_GOOGLE_LOGIN_PATH,
	AUTH_FACEBOOK_LOGIN_PATH,
	AUTH_TWITTER_LOGIN_PATH,
	AUTH_GITHUB_LOGIN_PATH,
} from '../../../constants'

const LoginButton = styled(Button)`
	color: ${({ colour }) => colour};
	border-color: ${({ colour }) => colour};

	&:hover,
	&:active {
		background-color: ${({ colour }) => colour};
		border-color: ${({ colour }) => colour};
	}

	&:focus {
		box-shadow: 0 0 0 3px ${({ shadow }) => shadow};
	}
`

const LoginModal = ({ isOpen, toggle }) => (
	<Modal isOpen={isOpen} toggle={toggle}>
		<ModalBody>
			<LoginButton
				href={AUTH_GOOGLE_LOGIN_PATH}
				colour={COLOURS.google}
				shadow={COLOURS.googleShadow}
				outline
				block>
				Login with Google
			</LoginButton>
			<LoginButton
				href={AUTH_FACEBOOK_LOGIN_PATH}
				colour={COLOURS.facebook}
				shadow={COLOURS.facebookShadow}
				outline
				block>
				Login with Facebook
			</LoginButton>
			<LoginButton
				href={AUTH_TWITTER_LOGIN_PATH}
				colour={COLOURS.twitter}
				shadow={COLOURS.twitterShadow}
				outline
				block>
				Login with Twitter
			</LoginButton>
			<LoginButton
				href={AUTH_GITHUB_LOGIN_PATH}
				colour={COLOURS.github}
				shadow={COLOURS.githubShadow}
				outline
				block>
				Login with Github
			</LoginButton>
		</ModalBody>
	</Modal>
)

export default LoginModal
