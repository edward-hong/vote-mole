import React from 'react'
import Pagination from 'react-ultimate-pagination-bootstrap-4'
import { isNil, and, divide } from 'ramda'

const PageIndex = ({ polls, count, pageSize, page, onPageChange }) => {
	if (and(isNil(polls), isNil(count))) {
		return null
	}

	return (
		<Pagination
			currentPage={page}
			totalPages={Math.ceil(divide(count, pageSize))}
			onChange={onPageChange}
		/>
	)
}

export default PageIndex
