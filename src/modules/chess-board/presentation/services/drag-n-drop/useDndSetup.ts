import { useDragDropManager } from "@dnd-kit/react";
import { useSelectPiece } from "../../hooks/useSelectPiece";
import { useSelectSquare } from "../../hooks/useSelectSquare";
import { useBoardStore } from "../../stores/board-store/hook";
import { useEffect } from "react";

export function useDndSetup() {
	const selectPiece = useSelectPiece();
	const manager = useDragDropManager();
	const selectSquare = useSelectSquare();
	const getPieceById = useBoardStore((state) => state.getPieceById);

	useEffect(
		function handleSelectPiece() {
			if (!manager) return;

			const cleanup = manager.monitor.addEventListener(
				"dragstart",
				(e) => {
					const source = e.operation.source;
					if (!source) return;

					const sourceId = source.id;
					if (typeof sourceId !== "string") return;

					const [type, id] = sourceId.split("-");
					console.log("Drag started:", { type, id });
					const piece = getPieceById(id);
					if (!piece) {
						console.warn(`Piece with id ${id} not found`);
						return;
					}

					selectPiece(piece);
				},
			);

			return cleanup;
		},
		[manager, getPieceById, selectPiece],
	);

	useEffect(
		function handleMovePiece() {
			if (!manager) return;

			const cleanup = manager.monitor.addEventListener("dragend", (e) => {
				const { canceled, target } = e.operation;
				if (canceled || !target) {
					console.log("Drag canceled");
					return;
				}

				const targetId = target.id;
				console.log("Drag ended on target:", targetId);
				if (typeof targetId !== "string") return;

				let position: number;
				const [type, value] = targetId.split("-");
				if (type === "piece") {
					const piece = getPieceById(value);
					if (!piece) {
						console.warn(`Piece with id ${value} not found`);
						return;
					}
					position = piece.position;
				} else {
					position = parseInt(value);
				}

				console.log("Selecting square at position:", position, type);
				selectSquare(position);
			});

			return cleanup;
		},
		[getPieceById, manager, selectSquare],
	);
}
