import React, {useCallback} from "react";

export default function NodeCreator() {
	const onConnectStart = useCallback((_, {nodeId}) => {
		connectingNodeId.current = nodeId;
	}, []);

	const onConnectEnd = useCallback((event) => {
		const targetIsPane =
			event.target.classList.contains("react-flow__pane");
		if (targetIsPane) {
			const id = uid();
			// we need to remove the wrapper bounds, in order to get the correct position
			// const {top, left} =
			// 	reactFlowWrapper.current.getBoundingClientRect();
			const newNode = {
				id,
				// we are removing the half of the node width (75) to center the new node
				position: {x: 0, y: 100},
				data: {
					label: `Node`,
					background: "var(--color-node-unbound-bg)",
					type: "Issue",
					onChange: onChangeNodeLabel,
					status: "custom",
				},
				parentNode: connectingNodeId.current,
				type: "unbound",
			};

			setNodes((nds) => nds.concat(newNode));
			setEdges((eds) =>
				eds.concat({
					id,
					source: connectingNodeId.current,
					target: id,
				})
			);
		}
	}, []);

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
