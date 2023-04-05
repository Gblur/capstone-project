import React, {useState, useEffect, useCallback, useRef} from "react";
import ReactFlow, {
	Background,
	Controls,
	ReactFlowProvider,
	useNodesState,
	useEdgesState,
} from "reactflow";
import {styles} from "./styles.js";
import useSWR from "swr";
import useStore from "../../store";
import {shallow} from "zustand/shallow";
import {CircularProgress} from "@mui/material";
import {Modal, Box, Typography} from "@mui/material";
import {useImmer} from "use-immer";
import {nodeTypes} from "../../components/Node/customNode";
import {uid} from "uid";

const styleModalBox = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "50%",
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

const selector = (state) => ({
	nodes: state.nodes,
	edges: state.edges,
	onNodesChange: state.onNodesChange,
	onEdgesChange: state.onEdgesChange,
	onConnectStart: state.onConnectStart,
	onConnectEnd: state.onConnectEnd,
	onConnect: state.onConnect,
});

export default function Canvas() {
	const user = process.env.REACT_APP_USERNAME || "Gblur";
	const url = `https://api.github.com/users/${user}/repos`;
	// const initialNode = [
	// 	{
	// 		id: "1",
	// 		type: "parent",
	// 		data: {
	// 			label: "Map Name",
	// 			background: "var(--color-node-parent-bg)",
	// 			type: "root",
	// 			onChange: () => {},
	// 			status: "unknown",
	// 		},
	// 		position: {x: 250, y: 25},
	// 		selectable: false,
	// 		deletable: false,
	// 	},
	// ];

	// const initialEdge = [];
	const {
		nodes,
		edges,
		onNodesChange,
		onEdgesChange,
		onConnectStart,
		onConnectEnd,
	} = useStore(selector, shallow);
	const {data, isLoading} = useSWR(url);
	// const [nodes, setNodes, onNodesChange] = useNodesState(initialNode);
	// const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdge);
	const [open, setOpen] = useState(false);
	const [branchUrl, setbranchUrl] = useImmer("");
	const branchData = useSWR(branchUrl);

	let base = -300;
	// const onConnectStart = useCallback((_, {nodeId}) => {
	// 	connectingNodeId.current = nodeId;
	// }, []);

	// const onConnectEnd = useCallback((event) => {
	// 	const targetIsPane =
	// 		event.target.classList.contains("react-flow__pane");
	// 	if (targetIsPane) {
	// 		const id = uid();
	// 		// we need to remove the wrapper bounds, in order to get the correct position
	// 		// const {top, left} =
	// 		// 	reactFlowWrapper.current.getBoundingClientRect();
	// 		const newNode = {
	// 			id,
	// 			// we are removing the half of the node width (75) to center the new node
	// 			position: {x: 0, y: 100},
	// 			data: {
	// 				label: `Node`,
	// 				background: "var(--color-node-unbound-bg)",
	// 				type: "Issue",
	// 				status: "custom",
	// 			},
	// 			parentNode: connectingNodeId.current,
	// 			type: "unbound",
	// 		};

	// 		setNodes((nds) => nds.concat(newNode));
	// 		setEdges((eds) =>
	// 			eds.concat({
	// 				id,
	// 				source: connectingNodeId.current,
	// 				target: id,
	// 			})
	// 		);
	// 	}
	// }, []);

	// const onChangeNodeLabel = (label, id) => {
	// 	console.log("currentId: ", id, "label: ", label);

	// 	setNodes([
	// 		...nodes,
	// 		...nodes.map((node) => {
	// 			if (node.id !== id) {
	// 				return node;
	// 			}
	// 			node.data = {
	// 				...node.data,
	// 				label,
	// 			};
	// 		}),
	// 	]);
	// };

	function handleNodeClick(event) {
		const currentNode = nodes.find((node) => {
			return node.id === event.currentTarget.getAttribute("data-id");
		});
		if (currentNode?.branches) {
			setbranchUrl(currentNode["branches"].replace("{/branch}", ""));
		}
	}

	// function filteredData(data, filter) {
	// 	if (data) {
	// 		return data.filter((item) => {
	// 			if (filter) {
	// 				return item.language === filter;
	// 			}
	// 			return item;
	// 		});
	// 	}
	// }

	// const filterData = filteredData(data, filter);

	// function addChilds() {
	// 	setNodes([
	// 		...initialNode,
	// 		...filterData.map((item) => {
	// 			return {
	// 				id: item["node_id"],
	// 				data: {
	// 					label: item.name,
	// 					status: item.visibility,
	// 					background: "var(--color-node-child-bg)",
	// 					type: "child",
	// 					onChange: () => {},
	// 				},
	// 				position: {
	// 					x: filterData.length > 10 ? 0 : (base += 200),
	// 					y: filterData.length > 10 ? (base += 100) : 200,
	// 				},
	// 				parentNode: "1",
	// 				type: "child",
	// 				deletable: false,
	// 				branches: item["branches_url"],
	// 			};
	// 		}),
	// 	]);
	// }

	// function connectChilds() {
	// 	setEdges([
	// 		...filterData.map((item) => {
	// 			return {
	// 				id: item["node_id"],
	// 				source: "1",
	// 				target: item["node_id"],
	// 				animated: true,
	// 			};
	// 		}),
	// 	]);
	// }

	// console.log(nodes);

	// useEffect(() => {
	// 	if (!isLoading) {
	// 		addChilds();
	// 		connectChilds();
	// 		return () => {};
	// 	}
	// }, [isLoading, filter]);

	if (isLoading) return <CircularProgress />;

	return (
		<>
			<ReactFlowProvider>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onEdgesChange={onEdgesChange}
					onNodesChange={onNodesChange}
					onNodeClick={handleNodeClick}
					nodeTypes={nodeTypes}
					onConnectStart={onConnectStart}
					onConnectEnd={onConnectEnd}
					fitView>
					<Background style={{background: styles["color-bg"]}} />
					<Controls />
				</ReactFlow>
			</ReactFlowProvider>
			<Modal
				open={open}
				onClose={handleNodeClick}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<Box sx={styleModalBox}>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2">
						Text in a modal
					</Typography>
					<Typography
						id="modal-modal-description"
						sx={{mt: 2}}></Typography>
					<ul>
						{branchData?.data &&
							branchData.data.map((branch) => {
								return (
									<li key={branch.commit.sha}>
										<a
											href={
												branch.commit.url
											}>{`link to ${branch.name}`}</a>
									</li>
								);
							})}
					</ul>
				</Box>
			</Modal>
		</>
	);
}
