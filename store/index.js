import {create} from "zustand";
import nodeCreator from "../components/Canvas/hooks/nodeCreator";
import nodeGenerator from "../components/Canvas/hooks/nodeGenerator";
import {addEdge, addNode, applyNodeChanges, applyEdgeChanges} from "reactflow";
import {mountStoreDevtool} from "simple-zustand-devtools";

// const fetchDataById = ;
// invoke this function on Map Dashboard
// const handlePostData = async (map) => {
// 	const response = await fetch("/api", {
// 		method: "POST",
// 		body: JSON.stringify(map),
// 		headers: {"Content-Type": "application/json"},
// 	});
// 	if (response.ok) {
// 		await response.json();
// 	}
// };

const handleUpdateData = async (node, id) => {
	const response = await fetch(`/api/${id}`, {
		method: "PUT",
		body: JSON.stringify(node),
		headers: {"Content-Type": "application/json"},
	});
	if (response.ok) {
		await response.json();
	}
};

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
		nodes: initialNodes,
		edges: initialEdges,
	},
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create((set, get) => {
	return {
		map: initialMap,
		nodes: initialNodes,
		edges: initialEdges,
		fetch: async (id) => {
			const response = await fetch(`/api/${id}`);
			const data = await response.json();
			set({nodes: data.map.nodes, edges: data.map.edges});
		},
		onNodesChange: (changes) => {
			set({
				nodes: applyNodeChanges(changes, get().nodes),
			});
		},
		onEdgesChange: (changes) => {
			set({
				edges: applyEdgeChanges(changes, get().edges),
			});
		},
		onConnect: (connection) => {
			set({
				edges: addEdge(connection, get().edges),
			});
		},
		onGenerateNodes: (data) => {
			set({
				nodes: [...get().nodes, ...nodeGenerator(data).addChilds()],
				edges: [...get().edges, ...nodeGenerator(data).connectChilds()],
			});
		},
		onNodeCreate: (id) => {
			set({
				nodes: [...get().nodes, nodeCreator(id)],
			});
		},
		onUpdateMap: async (id) => {
			const nodesCreated = get().nodes.filter((node) => {
				return node.parentNode !== "1" && node.id !== "1";
			});
			handleUpdateData(
				{
					...get().map,
					map: {
						nodes: nodesCreated,
						edges: get().edges,
					},
				},
				id
			);
		},
		updateNodeLabel: (nodeId, label) => {
			set({
				nodes: get().nodes.map((node) => {
					if (node.id === nodeId) {
						node.data = {...node.data, label};
					}

					return node;
				}),
			});
		},
	};
});

mountStoreDevtool("store1", useStore);

export default useStore;
