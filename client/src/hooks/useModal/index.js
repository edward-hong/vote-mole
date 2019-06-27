import { useState } from 'react'
import { not } from 'ramda'

const useModal = () => {
	const [isOpen, setIsOpen] = useState(false)

	const toggle = () => setIsOpen(not(isOpen))

	return [isOpen, toggle]
}

export default useModal
