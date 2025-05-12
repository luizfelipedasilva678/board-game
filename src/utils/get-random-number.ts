function getRandomArbitrary(min: number, max: number) {
	const minimum = Math.ceil(min);
	const maximum = Math.floor(max);
	return Math.floor(Math.random() * (maximum - minimum) + minimum);
}

export default getRandomArbitrary;
