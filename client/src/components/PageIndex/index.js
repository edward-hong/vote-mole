import React from 'react'
import Pagination from 'react-ultimate-pagination-bootstrap-4'
import styled from 'styled-components'
import { isNil, and, divide } from 'ramda'

import { COLOURS } from '../../constants'

// Container to style Pagination component
const PaginationContainer = styled.div`
	.pagination {
		margin-top: 2rem;
		justify-content: center;
	}

	.page-link {
		color: ${COLOURS.primary};
		border-color: ${COLOURS.primary};

		&:focus,
		&:hover {
			color: white;
			border-color: ${COLOURS.primary};
			background-color: ${COLOURS.pageLinkHover};
			transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out;
		}
	}

	.page-item.active .page-link {
		background-color: ${COLOURS.primary};
		border-color: ${COLOURS.primary};
	}
`

const PageIndex = ({ polls, count, pageSize, page, onPageChange }) => {
	if (and(isNil(polls), isNil(count))) {
		return null
	}

	return (
		<PaginationContainer>
			<Pagination
				currentPage={page}
				totalPages={Math.ceil(divide(count, pageSize))}
				onChange={onPageChange}
			/>
		</PaginationContainer>
	)
}

export default PageIndex
