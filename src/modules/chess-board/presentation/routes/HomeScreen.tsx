import { ScrollArea } from "@base-ui/react";
import { useCallback, useRef, useState } from "react";
import {
	game_state,
	variant,
	type GameState,
} from "../../domain/constants";
import type { BoardHandler, Presets } from "../type";
import { Board } from "../components/Board";
import { BoardGameStateDialog } from "@/components/ResultDialog";
import {
	chess24Presets,
	chessComPresets,
	lichessPresets,
	nightPresets,
	purplePresets,
	tournamentPresets,
	walnutPresets,
} from "../presets";
import type { Variant } from "../../domain/type";

const BOARDS: { title: string; game: Variant; preset: Presets; flipped?: boolean }[] = [
	{ title: "Chess.com", game: variant.CLASSIC, preset: chessComPresets },
	{ title: "Lichess", game: variant.CHESS960, preset: lichessPresets, flipped: true },
	{ title: "Night", game: variant.CLASSIC, preset: nightPresets },
	{ title: "Tournament", game: variant.CLASSIC, preset: tournamentPresets, flipped: true },
	{ title: "Chess24", game: variant.CLASSIC, preset: chess24Presets },
	{ title: "Purple", game: variant.CLASSIC, preset: purplePresets, flipped: true },
	{ title: "Walnut", game: variant.CLASSIC, preset: walnutPresets },
];

export function HomeScreen() {
	return (
		<div className="w-full h-full bg-[#252525] pb-60">
			<div className="w-full px-40 pt-20 pb-12 text-white">
				<h2 className="scroll-m-20 pb-2 text-4xl font-semibold tracking-tight first:mt-0">
					Chess in React
				</h2>
				<p className="leading-7 not-first:mt-2 max-w-180">
					is my attempt to build a complex chess interface the React
					way, using composition, clean architecture, and testable
					patterns to explore how far React can go for this kind of
					interactive UI.
				</p>
			</div>
			<ScrollArea.Root>
				<ScrollArea.Viewport className="w-full h-[68vh] pl-30">
					<div className="flex items-center flex-nowrap">
						{BOARDS.map((board) => (
							<CustomBoard key={board.title} {...board} />
						))}
					</div>
				</ScrollArea.Viewport>
				<ScrollArea.Scrollbar
					className="relative w-full flex rounded-sm bg-gray-200 opacity-0 transition-opacity pointer-events-none before:absolute before:content-[''] data-[orientation=vertical]:m-2 data-[orientation=vertical]:w-1 data-[orientation=vertical]:before:h-full data-[orientation=vertical]:before:w-5 data-[orientation=vertical]:before:left-1/2 data-[orientation=vertical]:before:-translate-x-1/2 data-[orientation=horizontal]:m-2 data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:before:h-5 data-[orientation=horizontal]:before:w-full data-[orientation=horizontal]:before:left-0 data-[orientation=horizontal]:before:right-0 data-[orientation=horizontal]:before:-bottom-2 data-hovering:pointer-events-auto data-hovering:opacity-100 data-hovering:delay-0 data-scrolling:pointer-events-auto data-scrolling:opacity-100 data-scrolling:duration-0"
					orientation="horizontal"
				>
					<ScrollArea.Thumb className="w-full rounded-sm bg-gray-500" />
				</ScrollArea.Scrollbar>
				<ScrollArea.Corner />
			</ScrollArea.Root>
		</div>
	);
}

function CustomBoard({
	title,
	game,
	preset,
	flipped = false,
}: {
	title: string;
	game: Variant;
	preset: Presets;
	flipped?: boolean;
}) {
	const ref = useRef<BoardHandler>(null);
	const [gameState, setGameState] = useState<GameState>(game_state.ONGOING);
	const handleReset = useCallback(() => {
		ref.current?.reset();
		setGameState(game_state.ONGOING);
	}, []);

	return (
		<div className="w-[40vw] shrink-0 h-full flex flex-col gap-4 justify-center items-center relative">
			<div className="w-[80%]">
				<h3 className="scroll-m-20 text-white text-2xl font-semibold tracking-tight">
					{title}
				</h3>
			</div>
			<div className="w-[80%] aspect-square relative z-10">
				<Board.Root
					flipped={flipped}
					theme={preset.theme}
					variant={game}
					onGameStateChange={(state) => {
						setGameState(state);
					}}
				>
					<Board ref={ref}>
						<Board.PieceList />
						<Board.SelectList render={preset?.renderSelect} />
						<Board.SquareList />
						<Board.Coordinates />
						<Board.Control>
							<Board.Control.VariantForm />
							<Board.Control.SeedForm />
						</Board.Control>
					</Board>
				</Board.Root>
			</div>
			<BoardGameStateDialog
				gameState={gameState}
				onOpenChange={() => setGameState(game_state.ONGOING)}
				onReset={handleReset}
			/>
		</div>
	);
}
