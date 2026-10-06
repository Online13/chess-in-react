import { memo, useCallback, useMemo, type ReactNode } from "react";
import type { BoardTheme, PieceRender, SelectRender } from "../../type";
import { renderSquare } from "../render/renderSquare";
import { useBoardStore } from "../../stores/board-store/hook";
import { getPosition, isBlackSquare } from "@/modules/chess-board/domain/services/position";
import { SquareView } from "../ui/SquareView";
import { case_type } from "@/modules/chess-board/domain/constants";
import type {
	PieceData,
	SquareSelectData,
} from "@/modules/chess-board/domain/value_objects";
import { renderPiece } from "../render/renderPiece";
import { useSelectPiece } from "../../hooks/useSelectPiece";
import { renderSelect } from "../render/renderSelect";
import { useSelectSquare } from "../../hooks/useSelectSquare";
import clsx from "clsx";
import { useSquareDraggable } from "../../services/drag-n-drop";
import { zIndex } from "../../data/z-index";
import { metadata } from "../../data/metadata";

type SquareviewRender = (data: {
	theme: BoardTheme;
	black: boolean;
	x: number;
	y: number;
}) => ReactNode;

interface SquareProps {
	position: number;
	render?: SquareviewRender;
}

export const BoardSquare = memo(function Square({
	position,
	render = renderSquare,
}: SquareProps) {
	const updatePromotionPiece = useBoardStore(
		(state) => state.setPromotionPiece,
	);
	const props = useSquareDraggable({
		id: `square-${position}`,
		draggable: false,
	});
	const theme = useBoardStore((state) => state.theme);
	const handleClick = useCallback(() => {
		updatePromotionPiece(null);
	}, [updatePromotionPiece]);
	const Render = useMemo(() => {
		const { x, y } = getPosition(position);
		const black = isBlackSquare(x, y);
		return render({ x, y, black, theme });
	}, [position, render, theme]);
	return (
		<SquareView
			{...props}
			zIndex={zIndex.SQUARE}
			position={position}
			metadata={metadata.SQUARE}
			onClick={handleClick}
		>
			{/* <span className="text-xl absolute top-0 left-0">{position}</span> */}
			{Render}
		</SquareView>
	);
});

interface PieceProps extends PieceData {
	render?: PieceRender;
}

export const BoardPiece = memo(function Piece({
	render = renderPiece,
	...piece
}: PieceProps) {
	const selectPiece = useSelectPiece();
	const updatePromotionPiece = useBoardStore(
		(state) => state.setPromotionPiece,
	);
	const props = useSquareDraggable({
		id: `piece-${piece.id}`,
		draggable: true,
	});
	const handleSelectPiece = useCallback(() => {
		updatePromotionPiece(null);
		selectPiece(piece);
	}, [updatePromotionPiece, selectPiece, piece]);
	const Render = useMemo(() => render(piece), [piece, render]);
	return (
		<SquareView
			{...props}
			zIndex={zIndex.PIECE}
			onClick={handleSelectPiece}
			position={piece.position}
			metadata={metadata.PIECE}
			className={clsx(["flex justify-center items-center text-4xl"])}
		>
			{Render}
		</SquareView>
	);
});

export const BoardSelect = memo(function Select({
	type,
	position,
	render = renderSelect,
}: SquareSelectData & { render?: SelectRender }) {
	const selectSquare = useSelectSquare();
	const updatePromotionPiece = useBoardStore(
		(state) => state.setPromotionPiece,
	);
	const props = useSquareDraggable({
		id: `select-${position}`,
		draggable: false,
	});
	const theme = useBoardStore((state) => state.theme);
	const handleSelectSquare = useCallback(() => {
		updatePromotionPiece(null);
		selectSquare(position);
	}, [updatePromotionPiece, selectSquare, position]);
	const Render = useMemo(
		() => render({ position, type, theme }),
		[position, type, theme, render],
	);
	return (
		<SquareView
			{...props}
			position={position}
			onClick={handleSelectSquare}
			metadata={metadata.SELECT}
			zIndex={
				type === case_type.THREAT ? zIndex.SELECT_THREAT : zIndex.SELECT
			}
		>
			{Render}
		</SquareView>
	);
});
