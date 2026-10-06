import { type PropsWithChildren, type Ref } from "react";
import type { BoardHandler, BoardParams } from "../type";
import { ChessControl } from "./control/ChessControl";
import { BoardProvider } from "../stores/board-store/provider";
import { BoardPiece, BoardSelect, BoardSquare } from "./container/Elements";
import { PieceList, SelectList, SquareList } from "./container/Lists";
import { PromotionForm } from "./board/Promotion";
import { useExposeTools } from "../hooks/useExposeTools";
import { DndProvider } from "../services/drag-n-drop";
import {
	ColumnCoordinates,
	Coordinates,
	RowCoordinates,
} from "./container/Coordinates";
import { variant as cnsVariant } from "../../domain/constants";
// import { BoardDebug } from "./board/Debug";

// ----------------------------------------------------------

export function Board({
	ref,
	children,
}: PropsWithChildren<{ ref: Ref<BoardHandler> }>) {
	useExposeTools(ref);
	return <div className="w-full h-full relative">{children}</div>;
}

type RootProps = PropsWithChildren<
	Omit<BoardParams, "variant"> & {
		variant?: BoardParams["variant"];
	}
>;

Board.Root = function Root({
	children,
	variant = cnsVariant.CLASSIC,
	...params
}: RootProps) {
	return (
		<BoardProvider variant={variant} {...params}>
			<DndProvider>{children}</DndProvider>
		</BoardProvider>
	);
};

Board.SquareList = SquareList;
Board.PieceList = PieceList;
Board.SelectList = SelectList;

Board.Square = BoardSquare;
Board.Piece = BoardPiece;
Board.Select = BoardSelect;

Board.RowCoordinates = RowCoordinates;
Board.ColumnCoordinates = ColumnCoordinates;
Board.Coordinates = Coordinates;

Board.Control = ChessControl;
Board.PromotionForm = PromotionForm;
