import clsx from "clsx";
import type { BoardTheme } from "../../type";

interface Props {
	inside: boolean;
	flipped: boolean;
	theme: BoardTheme["coordinates"];
}

/**
 * Explanation: https://www.chess.com/article/view/chess-notation
 */
export function RankCoordinates({ inside, flipped, theme }: Props) {
	return (
		<div
			className={clsx([
				"h-full w-8 absolute top-0 left-0 z-40 pointer-events-none",
				!inside && "-translate-x-full",
			])}
		>
			{Array.from({ length: 8 }, (_, i) => (
				<div
					key={i}
					className={clsx([
						"w-full h-[12.5%] flex text-sm text-gray-500",
						!inside && "items-center justify-center",
					])}
					style={
						theme && {
							color: inside
								? i % 2 === 0
									? theme.foreground_white
									: theme.foreground_black
								: theme.foreground_outside,
						}
					}
				>
					{flipped ? i + 1 : 8 - i}
				</div>
			))}
		</div>
	);
}

export function FileCoordinates({ inside, flipped, theme }: Props) {
	return (
		<div
			className={clsx([
				"h-8 w-full absolute bottom-0 left-0 z-40 pointer-events-none flex items-center",
				!inside && "translate-y-full",
			])}
		>
			{Array.from({ length: 8 }, (_, i) => (
				<div
					key={i}
					className={clsx([
						"h-full w-[12.5%] flex text-sm text-gray-500",
						!inside && "items-center justify-center",
						inside && "justify-end items-end pr-1",
					])}
					style={
						theme && {
							color: inside
								? i % 2 === 0
									? theme.foreground_black
									: theme.foreground_white
								: theme.foreground_outside,
						}
					}
				>
					{String.fromCharCode(flipped ? 72 - i : 65 + i)}
				</div>
			))}
		</div>
	);
}
