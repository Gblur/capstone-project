export default function nodeCreator(id) {
	return {
		id,
		position: {x: 0, y: 100},
		data: {
			label: `Node`,
			background: "var(--color-node-unbound-bg)",
			type: "Issue",
			status: "custom",
		},
		type: "unbound",
		parent: "",
	};
}
