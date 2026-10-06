import { piece_color, turn_state } from "../../domain/constants";
import { getGameService } from "../../domain/services/game-service";
import { Result } from "../../domain/services/result-type";
import type { Variant } from "../../domain/type";
import type { PieceData, SquareSelectData } from "../../domain/value_objects";

interface View {
	updateSelectSquares: (data: SquareSelectData[]) => void;
	updateSelectedPiece: (piece: PieceData | null) => void;
}

interface State {
	turn: number;
	variant: Variant;
	piece: PieceData;
	data: PieceData[];
	enPassantTarget: number | null;
}

type Output =
	| Result<undefined, never>
	| Result<never, "PIECE_NOT_OF_CURRENT_TURN">;

/**
 * Handle a piece click: validate the current turn color, then compute and expose
 * the legal destination squares for that piece.
 *
 * @param state.turn - The current turn index (0 = white, 1 = black).
 * @param state.piece - The piece the player clicked on.
 * @param state.data - The array of all pieces currently on the board.
 * @param state.enPassantTarget - The active en passant capture square, or `null`.
 * @param view.updateSelectSquares - Replaces the highlighted-squares list.
 * @param view.updateSelectedPiece - Marks the piece as the active selection.
 */
export const selectPieceUseCase =
	(view: View) =>
	(state: State): Output => {
		const service = getGameService(state.variant);
		const isNotCurrentTurnColor =
			(state.turn === turn_state.WHITE &&
				state.piece.color !== piece_color.WHITE) ||
			(state.turn === turn_state.BLACK &&
				state.piece.color !== piece_color.BLACK);
		if (isNotCurrentTurnColor) {
			return Result.error({ code: "PIECE_NOT_OF_CURRENT_TURN" });
		}

		view.updateSelectedPiece(state.piece);
		const moves = service.computePosssibleMoveOfPiece({
			data: state.data,
			position: state.piece.position,
			enPassantTarget: state.enPassantTarget,
		});
		view.updateSelectSquares(moves);
		return Result.success(undefined);
	};
