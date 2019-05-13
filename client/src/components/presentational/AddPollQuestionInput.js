import React from 'react'
import { FormGroup, Input, Label } from 'reactstrap'
import { and } from 'ramda'

import ErrorMessage from './styled/ErrorMessage'

const PollQuestionInput = ({
	input,
	label,
	type,
	placeholder,
	meta: { touched, error },
}) => {
	const valid = touched ? (error ? false : true) : null

	return (
		<FormGroup>
			<Label htmlFor={input.name}>{label}</Label>
			<Input valid={valid} {...input} type={type} placeholder={placeholder} />
			{and(and(touched, error), <ErrorMessage message={error} />)}
		</FormGroup>
	)
}

export default PollQuestionInput
