import { useState, type PropsWithChildren } from "react";
import { createBoardStore } from "./store";
import { BoardStoreContext } from "./context";
import type { BoardParams } from "../../type";

export function BoardProvider({
	children,
	...args
}: PropsWithChildren<BoardParams>) {
	const [store] = useState(() => createBoardStore(args));
	return (
		<BoardStoreContext.Provider value={store}>
			{children}
		</BoardStoreContext.Provider>
	);
}
