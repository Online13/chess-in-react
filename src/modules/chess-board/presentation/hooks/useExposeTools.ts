import { useImperativeHandle, type Ref } from "react";
import { useBoardStore } from "../stores/board-store/hook";
import type { BoardHandler } from "../type";

export function useExposeTools(ref: Ref<BoardHandler>) {
	const reset = useBoardStore((state) => state.reset);
	const toggleFlippled = useBoardStore((state) => state.toggleFlippled);
	useImperativeHandle(
		ref,
		() => ({
			reset() {
				reset();
			},
			flipBoard() {
				toggleFlippled();
			},
		}),
		[reset, toggleFlippled],
	);
}
