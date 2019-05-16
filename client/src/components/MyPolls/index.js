import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Container, Col } from 'reactstrap'
import { dec, multiply, is } from 'ramda'

import Polls from '../Polls'
import PageIndex from '../PageIndex'
import Row from '../styled/Row'
import MainHeading from '../styled/MainHeading'
import { fetchUserPolls, clearPolls } from '../../state/actions'

const MyPolls = ({ auth, polls, fetchUserPolls, clearPolls }) => {
	const pageSize = 5
	const [page, setPage] = useState(1)

	useEffect(() => {
		// Only fetch for user polls when logged in
		if (is(Object, auth)) {
			fetchUserPolls({ id: auth._id, limit: pageSize, offset: 0 })
		}

		return () => {
			clearPolls()
		}
	}, [fetchUserPolls, clearPolls, auth])

	// On page change, change page state and fetch for more data
	const onPageChange = page => {
		setPage(page)
		fetchUserPolls({
			id: auth._id,
			limit: pageSize,
			offset: multiply(pageSize, dec(page)),
		})
	}

	// Only render when logged in
	return is(Object, auth) ? (
		<Container fluid>
			<MainHeading>My Polls</MainHeading>
			<Row>
				<Col
					lg={{ size: '6', offset: 3 }}
					md={{ size: '8', offset: 2 }}
					sm={{ size: '10', offset: 1 }}
					xs="12">
					<Polls {...polls} />
					<PageIndex
						{...polls}
						page={page}
						pageSize={pageSize}
						onPageChange={onPageChange}
					/>
				</Col>
			</Row>
		</Container>
	) : null
}

const mapStateToProps = ({ polls }) => ({ polls })

export default connect(
	mapStateToProps,
	{ fetchUserPolls, clearPolls }
)(MyPolls)
