import {create} from "zustand";
import nodeCreator from "../components/Canvas/hooks/nodeCreator";
import nodeGenerator from "../components/Canvas/hooks/nodeGenerator";
import {addEdge, addNode, applyNodeChanges, applyEdgeChanges} from "reactflow";
import {mountStoreDevtool} from "simple-zustand-devtools";
import {uid} from "uid";

const handleUpdateData = async (node, id) => {
	const response = await fetch(`/api/maps/${id}`, {
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
		id: uid(),
		type: "parent",
		data: {
			label: "Root",
			background: "var(--color-node-parent-bg)",
			type: "root",
			status: "unknown",
		},
		position: {x: 250, y: 25},
	},
];
const initialEdge = [{}];

const useStore = create((set, get) => {
	return {
		map: {},
		nodes: [],
		edges: [],
		fetch: async (id) => {
			if (id) {
				const response = await fetch(`/api/maps/${id}`);
				if (response.ok) {
					const data = await response.json();
					set({
						nodes: JSON.parse(data.nodes),
						edges: JSON.parse(data.edges),
					});
					set({map: data});
				}
			}
		},
		onPostCreate: async (data, router) => {
			const response = await fetch(`/api/maps`, {
				method: "POST",
				body: JSON.stringify(data),
				headers: {"Content-Type": "application/json"},
			});
			if (response.ok) {
				const {_id} = await response.json();
				router.push(`/maps/${_id}`);
			}
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

		onNodeCreate: (id) => {
			set({
				nodes: [...get().nodes, nodeCreator(id)],
			});
		},
		onUpdateMap: async (id) => {
			handleUpdateData(
				{
					...get().map,
					nodes: JSON.stringify(get().nodes),
					edges: JSON.stringify(get().edges),
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
		updateNodeType: (nodeId, type) => {
			set({
				nodes: get().nodes.map((node) => {
					if (node.id === nodeId) {
						node.data = {...node.data, nodeType: type};
					}

					return node;
				}),
			});
		},
	};
});

// onGenerateNodes: (data, parentID) => {
// 	set({
// 		nodes: [
// 			...get().nodes,
// 			...nodeGenerator(data).addChilds(parentID),
// 		],
// 		edges: [
// 			...get().edges,
// 			...nodeGenerator(data).connectChilds(parentID),
// 		],
// 	});
// },

// mountStoreDevtool("store1", useStore);

export default useStore;
