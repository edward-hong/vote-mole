import React from 'react'
import { fireEvent } from '@testing-library/react'

import VoteForm from '.'
import renderWithRedux from '../../../utils/test/renderWithRedux'
import { votePoll } from '../../../state/actions'

jest.mock('../../../state/actions', () => ({
	votePoll: jest.fn(),
}))
global.open = jest.fn()

votePoll.mockImplementation(() => ({ type: 'test' }))

const poll = {
	_id: '5cdaf28cee882077685935e3',
	userId: '5cd19682498a98c6962f34c1',
	pollQuestion: 'PHP, Python or Ruby?',
	pollOptions: [
		{
			votes: 3,
			_id: '5cdaf28cee882077685935e6',
			option: 'PHP',
		},
		{
			votes: 8,
			_id: '5cdaf28cee882077685935e5',
			option: 'Python',
		},
		{
			votes: 6,
			_id: '5cdaf28cee882077685935e4',
			option: 'Ruby',
		},
	],
}

describe('VoteForm', () => {
	it('renders Loader when there is no poll', () => {
		const { container } = renderWithRedux(<VoteForm />, {
			initialState: { form: { vote: {} }, auth: false, poll: undefined },
		})

		expect(container.firstChild).toMatchSnapshot()
	})

	it('renders correctly when user is not logged in', () => {
		const { container } = renderWithRedux(<VoteForm />, {
			initialState: { form: { vote: {} }, auth: false, poll },
		})

		expect(container.firstChild).toMatchSnapshot()
	})

	it('shows custom option error when user selects custom option but have not filled out field', () => {
		const auth = {
			_id: '5cd19682498a98c6962f34c1',
			profileID: '111881712224957728911',
		}
		const vote = {
			registeredFields: {
				selection: {
					name: 'selection',
					type: 'Field',
					count: 1,
				},
				customSelection: {
					name: 'customSelection',
					type: 'Field',
					count: 1,
				},
			},
			fields: {
				selection: {
					visited: true,
					touched: true,
				},
				customSelection: {
					visited: true,
					touched: true,
				},
			},
			values: {
				selection: "I'd like a custom option",
			},
			syncErrors: {
				customSelection: 'Please enter your custom selection',
			},
			anyTouched: true,
		}
		const { getByText } = renderWithRedux(<VoteForm />, {
			initialState: {
				form: { vote },
				auth,
				poll,
			},
		})
		const errorMessage = getByText('Please enter your custom selection')

		expect(errorMessage).toBeInTheDocument()
	})

	it('calls submit when submitting form', () => {
		const vote = {
			registeredFields: {
				selection: {
					name: 'selection',
					type: 'Field',
					count: 1,
				},
			},
			fields: {
				selection: {
					visited: true,
					active: true,
				},
			},
			active: 'selection',
			values: {
				selection: 'PHP',
			},
		}
		const { getByTestId } = renderWithRedux(<VoteForm />, {
			initialState: {
				form: { vote },
				auth: false,
				poll,
			},
		})
		const form = getByTestId('vote-form')

		fireEvent.submit(form)

		expect(votePoll).toHaveBeenCalled()
	})

	it('sends user to Twitter when tweet button is clicked', () => {
		const auth = {
			_id: '5cd19682498a98c6962f34c1',
			profileID: '111881712224957728911',
		}
		const { getByText } = renderWithRedux(<VoteForm />, {
			initialState: {
				form: { vote: {} },
				auth,
				poll,
			},
		})
		const tweetButton = getByText('Tweet')
		fireEvent.click(tweetButton)

		expect(global.open).toHaveBeenCalled()
	})
})
