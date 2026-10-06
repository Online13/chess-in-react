import { useBoardStore } from "../../stores/board-store/hook";
import type { PieceRender, SelectRender, SquareviewRender } from "../../type";
import { BoardPiece, BoardSelect, BoardSquare } from "./Elements";

const squares = Array.from({ length: 8 * 8 }, (_, i) => i);

interface SquareListProps {
	render?: SquareviewRender;
}
export function SquareList({ render }: SquareListProps) {
	return squares.map((i) => (
		<BoardSquare key={i} position={i} render={render} />
	));
}

interface PieceListProps {
	render?: PieceRender;
}
export function PieceList(props: PieceListProps) {
	const boardData = useBoardStore((state) => state.data);
	return boardData.map((piece) => (
		<BoardPiece key={piece.id} {...piece} render={props.render} />
	));
}
interface SelectListProps {
	render?: SelectRender;
}
export function SelectList({ render }: SelectListProps) {
	const squareSelectData = useBoardStore((state) => state.squareSelectData);
	return squareSelectData.map((select) => (
		<BoardSelect key={select.position} {...select} render={render} />
	));
}
