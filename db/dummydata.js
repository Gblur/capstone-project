const initialNodes = [
	{
		id: "1",
		type: "parent",
		data: {
			label: "Map Name",
			background: "var(--color-node-parent-bg)",
			type: "root",
			status: "unknown",
		},
		position: {x: 250, y: 25},
		selectable: false,
		deletable: false,
	},
];
const initialEdges = [];

const initialMap = {
	name: "",
	team: "",
	mapType: "",
	map: {
		initialNodes,
		initialEdges,
	},
};
