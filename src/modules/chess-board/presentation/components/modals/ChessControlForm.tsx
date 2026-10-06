import {
	variant,
	variant_name,
} from "@/modules/chess-board/domain/constants";
import type { Variant } from "@/modules/chess-board/domain/type";
import clsx from "clsx";
import { Settings, X } from "lucide-react";
import { Fragment, useState } from "react";

interface Props {
	seed: number;
	setSeed: (seed: number) => void;
	currentVariant: Variant;
	onChangeVariant: (current_variant: Variant) => void;
	onApply: () => void;
}

export function ChessControlForm({
	seed,
	setSeed,
	currentVariant,
	onChangeVariant,
	onApply,
	onClose,
}: Props & { onClose?: () => void }) {
	return (
		<div className="w-80 p-4 bg-white absolute z-20 top-8 right-8 rounded-md space-y-4">
			<div className="h-8 flex justify-end">
				<button
					onClick={onClose}
					className={clsx([
						"inline hover:bg-gray-200 items-center justify-center rounded-md px-2 font-medium transition active:scale-102 cursor-pointer",
					])}
				>
					<X />
				</button>
			</div>
			<div className="space-y-4 pb-4">
				<div className="space-x-8 flex justify-between">
					<label htmlFor="variant">Variant</label>
					<select
						name="variant"
						id="variant"
						value={currentVariant}
						onChange={(e) =>
							onChangeVariant(e.target.value as Variant)
						}
					>
						{Object.values(variant).map((v: Variant) => (
							<option key={v} value={v}>
								{variant_name[v]}
							</option>
						))}
					</select>
				</div>
				{currentVariant === variant.CHESS960 && (
					<div className="space-x-8 flex justify-between">
						<label htmlFor="seed">Seed</label>
						<input
							type="number"
							name="seed"
							id="seed"
							min="0"
							max="959"
							value={seed}
							onChange={(e) => setSeed(Number(e.target.value))}
						/>
					</div>
				)}
			</div>
			<div className="">
				<button
					onClick={onApply}
					className="w-full h-10 items-center justify-center rounded-md bg-neutral-950 px-6 font-medium text-neutral-50 transition active:scale-102 cursor-pointer"
				>
					Apply
				</button>
			</div>
		</div>
	);
}

export function ChessControl(props: Props) {
	const [open, setOpen] = useState(false);

	return (
		<Fragment>
			<button
				onClick={() => setOpen(true)}
				className={clsx([
					"inline h-10 items-center justify-center rounded-md bg-neutral-950 px-6 font-medium text-neutral-50 transition active:scale-102 cursor-pointer",
					"absolute top-4 right-4 z-20",
				])}
			>
				<Settings />
			</button>
			{open && (
				<ChessControlForm {...props} onClose={() => setOpen(false)} />
			)}
		</Fragment>
	);
}
