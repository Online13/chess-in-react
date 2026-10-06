import { createProvider } from "@/lib/create-provider";
import {
	variant,
	variant_name,
} from "@/modules/chess-board/domain/constants";
import { Input, Popover, Select } from "@base-ui/react";
import clsx from "clsx";
import { CheckIcon, ChevronsUpDownIcon, Settings } from "lucide-react";
import { useState, type PropsWithChildren } from "react";
import { useBoardStore } from "../../stores/board-store/hook";
import type { Variant } from "@/modules/chess-board/domain/type";

interface ChessControlStore {
	seed: number;
	setSeed: (seed: number) => void;
	currentVariant: Variant;
	setCurrentVariant: (current_variant: Variant) => void;
}

const [ControlProvider, useControl] = createProvider<ChessControlStore>();

interface Props {
	onApply?: (v: {
		seed: ChessControlStore["seed"];
		variant: ChessControlStore["currentVariant"];
	}) => void;
}

export function ChessControl(props: PropsWithChildren<Props>) {
	const seedValue = useBoardStore((state) => state.seed);
	const variantValue = useBoardStore((state) => state.variant);
	const [isOpen, setIsOpen] = useState(false);
	const [seed, setSeed] = useState(seedValue);
	const [currentVariant, setCurrentVariant] = useState<Variant>(variantValue);

	return (
		<ControlProvider
			state={{ currentVariant, setCurrentVariant, seed, setSeed }}
		>
			<Popover.Root open={isOpen} onOpenChange={setIsOpen}>
				<Popover.Trigger
					className={clsx([
						"flex size-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-gray-900 select-none hover:bg-gray-100 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100 data-popup-open:bg-gray-100 font-normal",
						"absolute top-0 -right-2 z-50",
						"translate-x-full",
					])}
				>
					<Settings />
				</Popover.Trigger>
				<Popover.Portal>
					<Popover.Positioner sideOffset={8} className="z-50">
						<Popover.Popup className="origin-(--transform-origin) rounded-lg bg-[canvas] px-6 py-4 text-gray-900 shadow-lg shadow-gray-200 outline-1 outline-gray-200 transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300">
							<Popover.Arrow className="data-[side=bottom]:-top-2 data-[side=left]:-right-3.25 data-[side=left]:rotate-90 data-[side=right]:-left-3.25 data-[side=right]:-rotate-90 data-[side=top]:-bottom-2 data-[side=top]:rotate-180"></Popover.Arrow>
							<div className="w-80 space-y-4">
								{props.children}
								{props.onApply && (
									<div className="">
										<button
											onClick={() => {
												props.onApply?.({
													seed,
													variant: currentVariant,
												});
												setIsOpen(false);
											}}
											className="w-full h-10 items-center justify-center rounded-md bg-neutral-950 px-6 font-medium text-neutral-50 transition active:scale-102 cursor-pointer"
										>
											Apply
										</button>
									</div>
								)}
							</div>
						</Popover.Popup>
					</Popover.Positioner>
				</Popover.Portal>
			</Popover.Root>
		</ControlProvider>
	);
}

const variants = Object.values(variant).map((v) => ({
	label: variant_name[v],
	value: v,
}));

ChessControl.VariantForm = function VariantForm() {
	const control = useControl();
	return (
		<div className="">
			<Select.Root
				items={variants}
				onValueChange={(v) => {
					control?.setCurrentVariant?.(v as Variant);
				}}
				value={control.currentVariant}
			>
				<Select.Label className="cursor-default text-sm leading-5 font-bold text-gray-900">
					Variant
				</Select.Label>
				<Select.Trigger className="flex h-10 w-full items-center justify-between gap-3 rounded-md border border-gray-200 pr-3 pl-3.5 text-base bg-[canvas] text-gray-900 select-none hover:bg-gray-100 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 data-popup-open:bg-gray-100 font-normal">
					<Select.Value
						className="data-placeholder:opacity-60"
						placeholder="Select apple"
					/>
					<Select.Icon className="flex">
						<ChevronsUpDownIcon />
					</Select.Icon>
				</Select.Trigger>
				<Select.Portal>
					<Select.Positioner
						className="outline-hidden select-none z-60"
						sideOffset={8}
					>
						<Select.Popup className="group min-w-(--anchor-width) origin-(--transform-origin) bg-clip-padding rounded-md bg-[canvas] text-gray-900 shadow-lg shadow-gray-200 outline-1 outline-gray-200 transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-[side=none]:min-w-[calc(var(--anchor-width)+1rem)] data-[side=none]:data-ending-style:transition-none data-starting-style:scale-90 data-starting-style:opacity-0 data-[side=none]:data-starting-style:scale-100 data-[side=none]:data-starting-style:opacity-100 data-[side=none]:data-starting-style:transition-none dark:shadow-none dark:outline-gray-300">
							<Select.ScrollUpArrow className="top-0 z-1 flex h-4 w-full cursor-default items-center justify-center rounded-md bg-[canvas] text-center text-xs before:absolute data-[side=none]:before:-top-full before:left-0 before:h-full before:w-full before:content-['']" />
							<Select.List className="relative py-1 scroll-py-6 overflow-y-auto max-h-(--available-height)">
								{variants.map((v) => (
									<Select.Item
										key={v.value}
										value={v.value}
										className="grid cursor-default grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-4 pl-2.5 text-sm leading-4 outline-hidden select-none group-data-[side=none]:pr-12 group-data-[side=none]:text-base group-data-[side=none]:leading-4 data-highlighted:relative data-highlighted:z-0 data-highlighted:text-gray-50 data-highlighted:before:absolute data-highlighted:before:inset-x-1 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:before:rounded-sm data-highlighted:before:bg-gray-900 pointer-coarse:py-2.5 pointer-coarse:text-[0.925rem]"
									>
										<Select.ItemIndicator className="col-start-1">
											<CheckIcon className="size-3" />
										</Select.ItemIndicator>
										<Select.ItemText className="col-start-2">
											{v.label}
										</Select.ItemText>
									</Select.Item>
								))}
							</Select.List>
							<Select.ScrollDownArrow className="bottom-0 z-1 flex h-4 w-full cursor-default items-center justify-center rounded-md bg-[canvas] text-center text-xs before:absolute before:left-0 before:h-full before:w-full before:content-[''] data-[side=none]:before:-bottom-full" />
						</Select.Popup>
					</Select.Positioner>
				</Select.Portal>
			</Select.Root>
		</div>
	);
};

ChessControl.SeedForm = function SeedForm() {
	const control = useControl();
	if (control.currentVariant !== variant.CHESS960) return null;

	return (
		<label className="flex flex-col items-start gap-1 text-sm text-gray-900 font-bold">
			Seed
			<Input
				placeholder="0-959"
				max={959}
				min={0}
				value={control.seed}
				onChange={(e) => {
					const newSeed = Number(e.target.value);
					control?.setSeed?.(newSeed);
				}}
				className="h-10 w-56 rounded-md border border-gray-200 pl-3.5 text-base text-gray-900 focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800 font-normal"
			/>
		</label>
	);
};
