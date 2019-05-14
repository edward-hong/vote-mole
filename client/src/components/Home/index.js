import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Row as BootstrapRow, Col } from 'reactstrap'
import styled from 'styled-components'

import Polls from '../Polls'
import { fetchAllPolls } from '../../state/actions'

const MainHeading = styled.h1`
	text-align: center;
`

const SubHeading = styled.h2`
	text-align: center;
`

const Row = styled(BootstrapRow)`
	margin-top: 1.5rem;
`

const Home = ({ polls, fetchAllPolls }) => {
	useEffect(() => {
		fetchAllPolls()
	}, [fetchAllPolls])

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
				</Col>
			</Row>
		</Container>
	)
}

const mapStateToProps = ({ polls }) => ({ polls })

export default connect(
	mapStateToProps,
	{ fetchAllPolls }
)(Home)
