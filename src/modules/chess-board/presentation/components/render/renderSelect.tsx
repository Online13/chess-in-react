import { case_type } from "@/modules/chess-board/domain/constants";
import type { SquareSelectData } from "@/modules/chess-board/domain/value_objects";
import clsx from "clsx";
import type { BoardTheme } from "../../type";

const selectData = {
	[case_type.PIECE]: {
		label: "Selected piece",
		opacity: 0.3,
		bgKey: "piece" as const,
	},
	[case_type.THREAT]: {
		label: "Threatened square",
		opacity: 0.3,
		bgKey: "threat" as const,
	},
	[case_type.SQUARE]: {
		label: "Selected square",
		opacity: 0.2,
		bgKey: "path" as const,
	},
};

interface Props extends Omit<SquareSelectData, "from"> {
	theme: BoardTheme;
}

export function renderSelect({ position, type, theme }: Props) {
	const className = "w-full h-full";
	if (!(type in selectData)) {
		throw new Error("Unknonw type : " + type);
	}

	const { label, opacity, bgKey } = selectData[type];

	return (
		<div
			style={{ backgroundColor: theme.square[bgKey], opacity }}
			title={`${label} at position ${position}`}
			className={clsx([className])}
		/>
	);
}
