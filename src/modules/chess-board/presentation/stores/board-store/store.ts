import { createStore } from "zustand";
import {
	game_state,
	turn_state,
	variant,
	type GameState,
	type PieceType,
	type Turn,
} from "../../../domain/constants";
import type {
	PieceData,
	SquareSelectData,
} from "../../../domain/value_objects";
import type { BoardParams, BoardTheme } from "../../type";
import { defaultTheme } from "../../data";
import type { Variant } from "@/modules/chess-board/domain/type";
import { getGameService } from "@/modules/chess-board/domain/services/game-service";

interface State {
	theme: BoardTheme;
	seed: number;
	variant: Variant;
	data: PieceData[];
	turn: Turn;
	enPassantTarget: number | null;
	gameState: GameState;
	promotionPiece: PieceData | null;
	selectedPiece: PieceData | null;
	squareSelectData: SquareSelectData[];
	flipped: boolean;
	onGameStateChange?: (gameState: GameState) => void;
}

interface Action {
	reset: () => void;
	// selectPiece: (piece: PieceData) => void;
	// selectSquare: (position: number) => void;
	setSelectedPiece: (piece: PieceData | null) => void;
	setSelectSquares: (position: SquareSelectData[]) => void;
	setData: (data: PieceData[]) => void;
	setGameState: (gameState: GameState) => void;
	setEnPassantTarget: (position: number | null) => void;
	setPromotionPiece: (piece: PieceData | null) => void;
	setFlipped: (flipped: boolean) => void;
	toggleFlippled: () => void;
	nextTurn: () => void;
	promotePawn: (
		position: number,
		newType: PieceType,
		newPosition: number,
	) => void;
	getSelectPieceState: () => {
		piece: PieceData | null;
		turn: Turn;
		data: PieceData[];
		variant: Variant;
		enPassantTarget: number | null;
	};
	getSelectSquareState: () => {
		data: PieceData[];
		variant: Variant;
		selectedPiece: PieceData | null;
		enPassantTarget: number | null;
		promotionPiece: PieceData | null;
	};
	getPieceById: (id: string) => PieceData | null;
}

export interface BoardState extends State, Action {}

export type Store = ReturnType<typeof createBoardStore>;

export const createBoardStore = (args: BoardParams) => {
	const defaultState: State = {
		seed: 0,
		data: [],
		selectedPiece: null,
		squareSelectData: [],
		enPassantTarget: null,
		turn: turn_state.WHITE,
		variant: variant.CLASSIC,
		theme: args.theme || defaultTheme,
		gameState: game_state.ONGOING,
		onGameStateChange: args.onGameStateChange,
		promotionPiece: null,
		flipped: args.flipped ?? false,
	};

	if (!Array.isArray(args.data)) {
		const service = getGameService(args.variant);
		defaultState.data = service.createDefaultPiecePositions(args.seed);
	} else {
		defaultState.data = args.data;
	}

	return createStore<BoardState>((set, get) => ({
		...defaultState,
		reset: () => {
			set(defaultState);
		},
		nextTurn: () => {
			set((state) => ({ turn: (state.turn + 1) % 2 }));
		},
		setData: (data) => set({ data }),
		setGameState: (gameState) => set({ gameState }),
		setEnPassantTarget: (position) => set({ enPassantTarget: position }),
		setSelectSquares: (position) => set({ squareSelectData: position }),
		setSelectedPiece: (piece) => set({ selectedPiece: piece }),
		setPromotionPiece: (piece) => set({ promotionPiece: piece }),
		setFlipped: (flipped) => set({ flipped }),
		toggleFlippled: () => {
			set((state) => ({ flipped: !state.flipped }));
		},
		getSelectPieceState: () => {
			const state = get();
			return {
				piece: state.selectedPiece,
				turn: state.turn,
				data: state.data,
				variant: state.variant,
				enPassantTarget: state.enPassantTarget,
			};
		},
		getSelectSquareState: () => {
			const state = get();
			return {
				data: state.data,
				variant: state.variant,
				selectedPiece: state.selectedPiece,
				enPassantTarget: state.enPassantTarget,
				promotionPiece: state.promotionPiece,
			};
		},
		getPieceById: (id) => {
			const state = get();
			return (
				state.data.find((piece) => piece.id === parseInt(id)) || null
			);
		},
		promotePawn: (position, newType, newPosition) => {
			set((state) => {
				const newData = [...state.data];
				const pieceIndex = newData.findIndex(
					(p) => p.position === position,
				);
				if (pieceIndex !== -1) {
					newData[pieceIndex] = {
						...newData[pieceIndex],
						type: newType,
						position: newPosition,
					};
				}
				return { data: newData };
			});
		},
	}));
};
