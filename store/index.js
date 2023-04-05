import {create} from "zustand";
import {addEdge, addNode, applyNodeChanges, applyEdgeChanges} from "reactflow";
import useNodeCreator from "../components/Canvas/hooks/nodeCreator";

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
	const {onConnectStart, onConnectEnd} = useNodeCreator();
	return {
		nodes: initialNodes,
		edges: initialEdges,
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
		onConnectStart,
		onConnectEnd: () => {
			set({
				nodes: [...get().nodes, onConnectEnd().newNode],
				edges: [...get().edges, onConnectEnd().newEdge],
			});
		},
		updateNodeLabel: (nodeId, label) => {
			set({
				nodes: get().nodes.map((node) => {
					if (node.id === nodeId) {
						// it's important to create a new object here, to inform React Flow about the cahnges
						node.data = {...node.data, label};
					}

					return node;
				}),
			});
		},
	};
});

export default useStore;
