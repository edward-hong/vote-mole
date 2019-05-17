import React from 'react'
import { FormGroup, Input, Label } from 'reactstrap'
import { map, and, is } from 'ramda'

import ErrorMessage from '../../../styled/ErrorMessage'

const Select = ({
	input,
	label,
	type,
	pollOptions,
	auth,
	meta: { touched, error },
}) => {
	const valid = touched ? (error ? false : true) : null

	return (
		<FormGroup>
			<Label htmlFor={input.name}>{label}</Label>
			<Input valid={valid} {...input} type={type}>
				<option disabled />
				{map(
					({ option }) => (
						<option key={option}>{option}</option>
					),
					pollOptions
				)}
				{and(is(Object, auth), <option>I'd like a custom option</option>)}
			</Input>
			{and(and(touched, error), <ErrorMessage message={error} />)}
		</FormGroup>
	)
}

export default Select
