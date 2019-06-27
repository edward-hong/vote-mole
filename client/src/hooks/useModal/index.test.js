import useModal from '.'

const mockSetState = jest.fn()

jest.mock('react', () => ({
	useState: initial => [initial, mockSetState],
}))

describe('useModal', () => {
	it('toggle function toggles the state of isOpen', () => {
		const [, toggle] = useModal()

		toggle()

		expect(mockSetState).toHaveBeenCalled()
	})
})
