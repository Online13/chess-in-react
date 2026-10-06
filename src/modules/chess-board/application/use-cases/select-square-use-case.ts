import {
	case_type,
	game_state,
	piece_color,
	piece_type,
	type GameState,
} from "../../domain/constants";
import { getGameService } from "../../domain/services/game-service";
import { Result } from "../../domain/services/result-type";
import type { Variant } from "../../domain/type";
import type { PieceData, SquareSelectData } from "../../domain/value_objects";

interface View {
	updatePieces: (data: PieceData[]) => void;
	updateSelectSquares: (data: SquareSelectData[]) => void;
	updateEnPassantTarget: (target: number | null) => void;
	updateSelectedPiece: (piece: PieceData | null) => void;
	updateGameState: (state: GameState) => void;
	updatePromotionPiece: (piece: PieceData | null) => void;
	nextTurn: () => void;
	showModal: (gameState: GameState) => void;
}

interface State {
	variant: Variant;
	position: number;
	data: PieceData[];
	selectedPiece: PieceData;
	enPassantTarget: number | null;
	promotionPiece: PieceData | null;
}

type Output =
	| Result<undefined, never>
	| Result<never, "MOVING_PIECE_NOT_FOUND">
	| Result<never, "CANNOT_MOVE_TO_SAME_SQUARE">
	| Result<never, "MOVE_NOT_ALLOWED">
	| Result<never, "CANNOT_CAPTURE_OWN_PIECE">;

/**
 * Handle a destination square click: execute the move, update en passant state,
 * evaluate the new game status, and advance the turn.
 *
 * @param state.position - The flat position index (0–63) of the clicked square.
 * @param state.selectedPiece - The piece currently selected by the active player.
 * @param state.data - The array of all pieces currently on the board.
 * @param state.enPassantTarget - The active en passant capture square, or `null`.
 * @param view.updatePieces - Replaces the board piece array after the move.
 * @param view.updateSelectSquares - Clears the highlighted-squares list.
 * @param view.updateEnPassantTarget - Sets the new en passant target (or clears it).
 * @param view.updateSelectedPiece - Clears the active piece selection.
 * @param view.updateGameState - Updates the displayed game state.
 * @param view.nextTurn - Advances to the next player's turn.
 * @param view.showModal - Displays the end-game modal for terminal states.
 */
export const selectSquareUseCase =
	(view: View) =>
	(state: State): Output => {
		const service = getGameService(state.variant);
		const selectData: SquareSelectData = {
			type: case_type.SQUARE,
			position: state.position,
			from: state.selectedPiece,
		};

		const isPawnPromotion =
			state.selectedPiece.type === piece_type.PAWN &&
			((state.selectedPiece.color === piece_color.WHITE &&
				state.position < 8) ||
				(state.selectedPiece.color === piece_color.BLACK &&
					state.position >= 56));
		if (isPawnPromotion && !state.promotionPiece) {
			view.updatePieces(state.data);
			view.updatePromotionPiece({
				...state.selectedPiece,
				position: state.position,
			});
			return Result.success(undefined);
		}

		const result = service.selectSquare({
			selectData,
			data: state.data,
			enPassantTarget: state.enPassantTarget,
		});

		if (result.isFailure()) {
			return result;
		}

		const newData = result.getValue();
		view.updatePieces(newData);
		view.updateSelectSquares([]);

		const newEnPassantTarget = service.computeEnPassantTarget(
			state.selectedPiece,
			state.position,
		);
		view.updateEnPassantTarget(newEnPassantTarget);

		const newGameState = service.getGameStatus({
			data: newData,
			enPassantTarget: newEnPassantTarget,
		});

		if (state.position === state.selectedPiece.position)
			return Result.error({ code: "CANNOT_MOVE_TO_SAME_SQUARE" });

		if (
			newGameState !== game_state.ONGOING &&
			newGameState !== game_state.CHECK
		) {
			view.showModal(newGameState);
		}

		view.updateSelectedPiece(null);
		view.updateGameState(newGameState);

		view.nextTurn();
		return Result.success(undefined);
	};
