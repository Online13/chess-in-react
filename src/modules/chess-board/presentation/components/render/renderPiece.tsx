import {
	piece_color,
	piece_type,
} from "@/modules/chess-board/domain/constants";
import { Piece } from "../pieces";
import type { PieceData } from "@/modules/chess-board/domain/value_objects";

export function renderPiece({
	color,
	type,
}: Pick<PieceData, "color" | "type">) {
	const className = "w-full h-full";
	if (!(color in pieceData)) {
		throw new Error("Unknonw color : " + color);
	}
	if (!(type in pieceData[color])) {
		throw new Error("Unknonw type : " + type);
	}

	const { Component, title } = pieceData[color][type];

	return <Component className={className} title={title} />;
}

const pieceData = {
	[piece_color.BLACK]: {
		[piece_type.PAWN]: {
			Component: Piece.BlackPawn,
			title: "Black pawn",
		},
		[piece_type.ROOK]: {
			Component: Piece.BlackRook,
			title: "Black rook",
		},
		[piece_type.KNIGHT]: {
			Component: Piece.BlackKnight,
			title: "Black knight",
		},
		[piece_type.BISHOP]: {
			Component: Piece.BlackBishop,
			title: "Black bishop",
		},
		[piece_type.KING]: {
			Component: Piece.BlackKing,
			title: "Black king",
		},
		[piece_type.QUEEN]: {
			Component: Piece.BlackQueen,
			title: "Black queen",
		},
	},
	[piece_color.WHITE]: {
		[piece_type.PAWN]: {
			Component: Piece.WhitePawn,
			title: "White pawn",
		},
		[piece_type.ROOK]: {
			Component: Piece.WhiteRook,
			title: "White rook",
		},
		[piece_type.KNIGHT]: {
			Component: Piece.WhiteKnight,
			title: "White knight",
		},
		[piece_type.BISHOP]: {
			Component: Piece.WhiteBishop,
			title: "White bishop",
		},
		[piece_type.KING]: {
			Component: Piece.WhiteKing,
			title: "White king",
		},
		[piece_type.QUEEN]: {
			Component: Piece.WhiteQueen,
			title: "White queen",
		},
	},
};
