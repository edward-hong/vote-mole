import React from 'react'
import styled from 'styled-components'

import { COLOURS } from '../../constants'

const Error = styled.div`
	color: ${COLOURS.error};
`
const ErrorMessage = ({ message }) => <Error>{message}</Error>

export default ErrorMessage
