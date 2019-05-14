import React from 'react'
import styled from 'styled-components'

import { COLOURS } from '../../../constants'

const LoaderContainer = styled.div`
	position: relative;
	margin-top: 30px;
`

const LoaderWhirlpool = styled.div`
	margin: -24px 0 0 -24px;
	height: 49px;
	width: 49px;
	animation: cssload-rotate 1150ms linear infinite;

	&,
	&:before,
	&:after {
		position: absolute;
		top: 50%;
		left: 50%;
		border: 1px solid ${COLOURS.gray};
		border-left-color: black;
		border-radius: 974px;
	}

	&:before {
		content: '';
		margin: -22px 0 0 -22px;
		height: 43px;
		width: 43px;
		animation: cssload-rotate 1150ms linear infinite;
	}

	&:after {
		content: '';
		margin: -28px 0 0 -28px;
		height: 55px;
		width: 55px;
		animation: cssload-rotate 2300ms linear infinite;
	}

	@keyframes cssload-rotate {
		100% {
			transform: rotate(360deg);
		}
	}
`

const Loader = () => (
	<LoaderContainer>
		<LoaderWhirlpool />
	</LoaderContainer>
)

export default Loader
