export default function nodeCreator(parent, id) {
	// TODO: Use this for Edgedrop function
	// const onConnectStart = (_, {nodeId}) => {
	// 	connectingNodeId.current = nodeId;
	// };

	// const onConnectEnd = (event) => {};
	const node = {
		id,
		position: {x: 0, y: 300},
		data: {
			label: `Node`,
			background: "var(--color-node-unbound-bg)",
			nodeType: "Issue",
			status: "documentation",
		},
		parentNode: parent,
		type: "unbound",
	};
	const edge = {
		id,
		source: parent,
		target: id,
	};

	return {node, edge};
}
