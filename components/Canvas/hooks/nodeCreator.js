export default function nodeCreator(id) {
	// TODO: Use this for Edgedrop function
	// const onConnectStart = (_, {nodeId}) => {
	// 	connectingNodeId.current = nodeId;
	// };

	// const onConnectEnd = (event) => {};

	return {
		id,
		position: {x: 0, y: 100},
		data: {
			label: `Node`,
			background: "var(--color-node-unbound-bg)",
			nodeType: "Issue",
			status: "custom",
		},
		type: "unbound",
		parent: "",
	};
}
