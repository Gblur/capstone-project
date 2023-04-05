import React, {useCallback, useRef, useState} from "react";
import {uid} from "uid";

export default function useNodeCreator() {
	// const [isMounted, setisMounted] = useState(false);
	const connectingNodeId = useRef(null);

	const onConnectStart = (_, {nodeId}) => {
		// if (isMounted) {
		connectingNodeId.current = nodeId;
		// }
	};

	const onConnectEnd = () => {
		const id = uid();
		const newNode = {
			id,
			position: {x: 0, y: 100},
			data: {
				label: `Node`,
				background: "var(--color-node-unbound-bg)",
				type: "Issue",
				status: "custom",
			},
			parentNode: connectingNodeId.current,
			type: "unbound",
		};

		const newEdge = {
			id,
			source: connectingNodeId.current,
			target: id,
		};

		return {newNode, newEdge};
	};

	const onChangeNodeLabel = (label, id) => {
		console.log("currentId: ", id, "label: ", label);

		setNodes([
			...nodes,
			...nodes.map((node) => {
				if (node.id !== id) {
					return node;
				}
				node.data = {
					...node.data,
					label,
				};
			}),
		]);
	};

	return {
		onConnectEnd,
		onConnectStart,
		onChangeNodeLabel,
	};
}
