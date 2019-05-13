import React from 'react'
import { Field } from 'redux-form'
import styled from 'styled-components'
import { and, not, inc } from 'ramda'

import AddPollExtraOptionInput from './AddPollExtraOptionInput'
import ErrorMessage from '../../../styled/ErrorMessage'
import BlackButton from '../../../styled/BlackButton'
import mapIndexed from '../../../../utils/mapIndexed'

const PollOptionsWrapper = styled.div`
	text-align: center;
`

const AddOptionButton = styled(BlackButton)`
	margin-bottom: 10px;
`

const AddPollOptionsInputs = ({ fields, meta: { error, pristine } }) => {
	// Push option to fields array
	const handleAddOption = () => fields.push()

	return (
		<PollOptionsWrapper>
			<AddOptionButton outline onClick={handleAddOption}>
				Add Option
			</AddOptionButton>
			{and(and(not(pristine), error), <ErrorMessage message={error} />)}
			{/* Map through fields array */}
			{mapIndexed(
				(field, index) => (
					<Field
						key={index}
						name={field}
						component={AddPollExtraOptionInput}
						deleteOption={fields.remove}
						index={index}
						placeholder={`Option ${inc(index)}`}
					/>
				),
				fields
			)}
		</PollOptionsWrapper>
	)
}

export default AddPollOptionsInputs
