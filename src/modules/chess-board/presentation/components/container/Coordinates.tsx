import { useBoardStore } from "../../stores/board-store/hook";
import { FileCoordinates, RankCoordinates } from "../ui/Coordinates";

interface CoordinatesProps {
	inside?: boolean;
}

function RowCoordinates({ inside = false }: CoordinatesProps) {
	const theme = useBoardStore((state) => state.theme);
	const flipped = useBoardStore((state) => state.flipped);

	return (
		<RankCoordinates
			inside={inside}
			flipped={flipped}
			theme={theme.coordinates}
		/>
	);
}

function ColumnCoordinates({ inside = false }: CoordinatesProps) {
	const theme = useBoardStore((state) => state.theme);
	const flipped = useBoardStore((state) => state.flipped);

	return (
		<FileCoordinates
			inside={inside}
			flipped={flipped}
			theme={theme.coordinates}
		/>
	);
}

function Coordinates({ inside = false }: { inside?: boolean }) {
	const theme = useBoardStore((state) => state.theme);
	const flipped = useBoardStore((state) => state.flipped);

	return (
		<>
			<RankCoordinates
				inside={inside}
				flipped={flipped}
				theme={theme.coordinates}
			/>
			<FileCoordinates
				inside={inside}
				flipped={flipped}
				theme={theme.coordinates}
			/>
		</>
	);
}

export { RowCoordinates, ColumnCoordinates, Coordinates };