export function getPosition(position: number, flipped = false) {
	let x = position! % 8;
	let y = Math.floor(position! / 8);

	if (flipped) {
		x = 7 - x;
		y = 7 - y;
	}

	return { x, y };
}

export function isBlackSquare(x: number, y: number) {
	return (x + y) % 2 !== 0;
}
