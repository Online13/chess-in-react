import { useMemo } from "react";
import { getPosition } from "../../domain/services/position";
import { useBoardStore } from "../stores/board-store/hook";

export function useDisplayPosition(position: number) {
	const flipped = useBoardStore((s) => s.flipped);
	return useMemo(() => {
		return getPosition(position, flipped);
	}, [flipped, position]);
}
