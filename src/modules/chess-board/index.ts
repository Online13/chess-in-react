import { Board } from "./presentation/components/Board";
import { getStatusMessage } from "./presentation/utils";
import { Piece } from "./presentation/components/pieces";
import { type PieceData, type SquareSelectData } from "./domain/value_objects";
import {
	type CaseType,
	type GameState,
	case_type,
	game_state,
	piece_color,
	piece_type,
	turn_state,
	variant,
	variant_name,
} from "./domain/constants";
import type { BoardHandler, BoardTheme, Presets } from "./presentation/type";
import { ClassicGameService } from "./domain/services/classic";

export { Board, Piece };
export type {
	PieceData,
	SquareSelectData,
	GameState,
	BoardHandler,
	BoardTheme,
	CaseType,
	Presets,
};
export {
	game_state,
	piece_type,
	piece_color,
	case_type,
	turn_state,
	variant,
	variant_name,
};
export { getStatusMessage };
export { ClassicGameService };
