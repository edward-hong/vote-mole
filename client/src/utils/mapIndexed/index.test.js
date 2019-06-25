import mapIndexed from '.'

it('is a map function with index as a second argument', () => {
	const array = [null, null, null]
	const mapArray = (_, i) => i
	const mappedArray = mapIndexed(mapArray, array)

	expect(mappedArray).toEqual([0, 1, 2])
})
