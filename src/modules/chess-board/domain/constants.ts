export const piece_type = {
	PAWN: 0,
	ROOK: 1,
	KNIGHT: 2,
	BISHOP: 3,
	QUEEN: 4,
	KING: 5,
} as const;
export type PieceType = (typeof piece_type)[keyof typeof piece_type];
export const piece_color = {
	WHITE: 0,
	BLACK: 1,
} as const;

export type PieceColor = (typeof piece_color)[keyof typeof piece_color];

export const game_state = {
	WHITE_WIN: 0,
	BLACK_WIN: 1,
	STALE: 2,
	ONGOING: 3,
	CHECKMATE: 4,
	CHECK: 5,
} as const;
export type GameState = (typeof game_state)[keyof typeof game_state];

export const case_type = {
	PIECE: 0,
	SQUARE: 1,
	THREAT: 2,
} as const;
export type CaseType = (typeof case_type)[keyof typeof case_type];

export const turn_state = {
	WHITE: 0,
	BLACK: 1,
};
export type Turn = (typeof turn_state)[keyof typeof turn_state];

export const variant = {
	CLASSIC: "classic",
	CHESS960: "chess960",
	CRAZYHOUSE: "crazyhouse",
	BUGHOUSE: "bughouse",
	KING_OF_THE_HILL: "kingofthehill",
	THREE_CHECK: "threecheck",
	ANTICHESS: "antichess",
} as const;

export const variant_name = {
	[variant.CLASSIC]: "Classic",
	[variant.CHESS960]: "Chess960",
	[variant.CRAZYHOUSE]: "Crazyhouse",
	[variant.BUGHOUSE]: "Bughouse",
	[variant.KING_OF_THE_HILL]: "King of the Hill",
	[variant.THREE_CHECK]: "Three Check",
	[variant.ANTICHESS]: "Antichess",
} as const;

const positionX = ["A", "B", "C", "D", "E", "F", "G", "H"] as const;
const positionY = ["1", "2", "3", "4", "5", "6", "7", "8"] as const;

type Coordinate = `${(typeof positionX)[number]}${(typeof positionY)[number]}`;

export const position = Array.from<null, Coordinate>(
	{ length: 64 },
	(_, index) => {
		const x = positionX[index % 8];
		const y = positionY[7 - Math.floor(index / 8)];
		return `${x}${y}`;
	},
).reduce(
	(acc, pos, index) => {
		acc[pos] = index;
		return acc;
	},
	{} as Record<Coordinate, number>,
);