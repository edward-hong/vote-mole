import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { Doughnut } from 'react-chartjs-2'
import { isNil, map } from 'ramda'

import { COLOURS } from '../../../constants'

const Graph = () => {
	const poll = useSelector(({ poll }) => poll, shallowEqual)

	// Render nothing if poll data haven't been received
	if (isNil(poll)) {
		return null
	}

	// Determine dataset for graph
	const labels = map(({ option }) => option, poll.pollOptions)
	const data = map(({ votes }) => votes, poll.pollOptions)

	const backgroundColor = map(([bgColor]) => bgColor, COLOURS.graphColours)
	const hoverBackgroundColor = map(
		([_, hColor]) => hColor,
		COLOURS.graphColours,
	)

	const dataset = {
		labels,
		datasets: [{ data, backgroundColor, hoverBackgroundColor }],
	}

	return (
		<Doughnut
			width={60}
			height={50}
			data={dataset}
			legend={{ labels: { boxWidth: 10 } }}
		/>
	)
}

export default Graph
