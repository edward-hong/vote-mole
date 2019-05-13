import { Button } from 'reactstrap'
import styled from 'styled-components'

import { COLOURS } from '../../../constants'

const BlackButton = styled(Button)`
	color: ${COLOURS.primary};
	border-color: ${COLOURS.primary};

	&:hover,
	&:active {
		background-color: ${COLOURS.primary};
		border-color: ${COLOURS.primary};
	}

	&:focus {
		box-shadow: 0 0 0 3px rgba(33, 37, 41, 0.5);
	}
`

export default BlackButton
