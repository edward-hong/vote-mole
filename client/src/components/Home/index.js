import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Container, Col } from 'reactstrap'
import styled from 'styled-components'
import { dec, multiply } from 'ramda'

import Polls from '../Polls'
import PageIndex from '../PageIndex'
import Row from '../styled/Row'
import MainHeading from '../styled/MainHeading'
import { fetchAllPolls, clearPolls } from '../../state/actions'

const SubHeading = styled.h2`
	text-align: center;
`

const Home = () => {
	const pageSize = 5
	const [page, setPage] = useState(1)

	const dispatch = useDispatch()
	const polls = useSelector(({ polls }) => polls, shallowEqual)

	useEffect(() => {
		dispatch(fetchAllPolls({ limit: pageSize, offset: 0 }))

		return () => {
			dispatch(clearPolls())
		}
	}, [dispatch])

	const onPageChange = page => {
		setPage(page)
		dispatch(
			fetchAllPolls({ limit: pageSize, offset: multiply(pageSize, dec(page)) }),
		)
	}

	return (
		<Container fluid>
			<MainHeading>VoteMole</MainHeading>
			<SubHeading>Can You Dig It?</SubHeading>
			<Row>
				<Col
					lg={{ size: '6', offset: 3 }}
					md={{ size: '8', offset: 2 }}
					sm={{ size: '10', offset: 1 }}
					xs="12">
					<img
						className="logo-home"
						src="https://res.cloudinary.com/avatarhzh/image/upload/v1509887327/build-a-voting-app/logo.svg"
						alt="Vote Mole logo"
					/>
				</Col>
			</Row>
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
	)
}

export default Home
