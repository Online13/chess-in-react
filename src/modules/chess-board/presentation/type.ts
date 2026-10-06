import type { ReactNode } from "react";
import type { PieceData, SquareSelectData } from "../domain/value_objects";
import type { Variant } from "../domain/type";
import type { GameState } from "../domain/constants";
export type PieceRender = (
	data: Pick<PieceData, "type" | "color">,
) => ReactNode;

export type SelectRender = (
	data: Omit<SquareSelectData, "from"> & { theme: BoardTheme },
) => ReactNode;

export type SquareviewRender = (data: {
	theme: BoardTheme;
	black: boolean;
	x: number;
	y: number;
}) => ReactNode;

export interface BoardTheme {
	coordinates: {
		/** Label color on dark squares (inside mode) */
		foreground_black: string;
		/** Label color on light squares (inside mode) */
		foreground_white: string;
		/** Label color when coordinates are rendered outside the board */
		foreground_outside: string;
	};
	square: {
		/** Background color of light squares */
		white: string;
		/** Background color of dark squares */
		black: string;
		/** Highlight color for the last move or selected square */
		path: string;
		/** Highlight color for capturable squares */
		threat: string;
		/** Dot color for reachable squares */
		piece: string;
	};
}

export interface BoardHandler {
	reset: () => void;
	flipBoard: () => void;
}

export interface Presets {
	theme: BoardTheme;
	renderSelect: SelectRender;
}

export interface BoardParams {
	variant: Variant;
	seed?: number;
	data?: PieceData[];
	theme: BoardTheme;
	flipped?: boolean;
	onGameStateChange?: (gameState: GameState) => void;
}
