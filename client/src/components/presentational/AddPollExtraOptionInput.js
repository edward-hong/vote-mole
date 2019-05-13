import React from 'react'
import { Input, InputGroup, InputGroupAddon, Button } from 'reactstrap'
import FontAwesome from 'react-fontawesome'
import styled from 'styled-components'
import { and } from 'ramda'

import ErrorMessage from './styled/ErrorMessage'

const ExtraOption = styled(InputGroup)`
	margin-bottom: 3px;

	input {
		height: 47px;
	}
`

const PollExtraOptionInput = ({
	input,
	type,
	deleteOption,
	index,
	placeholder,
	meta: { error, touched },
}) => {
	const valid = touched ? (error ? false : true) : null

	const handleRemoveOption = () => deleteOption(index)

	return (
		<>
			<ExtraOption>
				<Input
					{...input}
					id={input.name}
					type={type}
					valid={valid}
					placeholder={placeholder}
				/>
				<InputGroupAddon addonType="append">
					<Button color="danger" outline onClick={handleRemoveOption}>
						<FontAwesome size="2x" name="close" />
					</Button>
				</InputGroupAddon>
			</ExtraOption>
			{and(and(touched, error), <ErrorMessage message={error} />)}
		</>
	)
}

export default PollExtraOptionInput
