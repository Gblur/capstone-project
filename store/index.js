import {create} from "zustand";
import nodeCreator from "../components/Canvas/hooks/nodeCreator";
import nodeGenerator from "../components/Canvas/hooks/nodeGenerator";
import {addEdge, addNode, applyNodeChanges, applyEdgeChanges} from "reactflow";
import {mountStoreDevtool} from "simple-zustand-devtools";

const handlePostData = async (nodes) => {
	try {
		const response = await fetch("/api/", {
			method: "POST",
			body: JSON.stringify(nodes),
			headers: {"Content-Type": "application/json"},
		});
		if (response.ok) {
			const data = await response.json();
			console.log(data);
		}
	} catch (error) {
		console.log(error);
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

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create((set, get) => {
	return {
		nodes: initialNodes,
		edges: initialEdges,
		fetch: async () => {
			const response = await fetch("/api/");
			set({nodes: await response.json()});
		},
		post: () => handlePostData(get().nodes),
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
