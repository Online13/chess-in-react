import { DragDropProvider } from "@dnd-kit/react";
import type { PropsWithChildren } from "react";
import { useDndSetup } from "./useDndSetup";


export function DndProvider({ children }: PropsWithChildren) {
	return (
		<DragDropProvider>
			<DragMonitor />
			{children}
		</DragDropProvider>
	);
}

function DragMonitor() {
	useDndSetup()
	return null;
}
