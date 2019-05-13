import React from 'react'

const Poll = ({ match }) => {
	console.log(match.params.id)
	return <div>Poll</div>
}

export default Poll
