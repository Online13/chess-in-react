import { useDraggable, useDragOperation, useDroppable } from "@dnd-kit/react";
import clsx from "clsx";
import { useMemo, type ComponentProps } from "react";

export function useSquareDraggable({
	id,
	draggable,
}: {
	id: string;
	draggable: boolean;
}): ComponentProps<"div"> {
	const { source } = useDragOperation();
	const { ref: draggableRef } = useDraggable({
		id: id,
		disabled: !draggable,
	});
	const { ref: droppableRef, isDropTarget } = useDroppable({
		id,
	});

	return useMemo(() => {
		return {
			ref: (instance) => {
				draggableRef(instance);
				droppableRef(instance);
			},
			className: clsx([
				isDropTarget && source?.id !== id && "border-4 border-white",
			]),
		};
	}, [draggableRef, droppableRef, id, isDropTarget, source]);
}
