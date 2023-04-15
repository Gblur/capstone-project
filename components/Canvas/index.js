import React, {useEffect} from "react";
import ReactFlow, {Background, Controls, ReactFlowProvider} from "reactflow";
import {styles} from "./styles.js";
import useStore from "../../store";
import {shallow} from "zustand/shallow";
import {Button} from "@mui/material";
import {Modal, Box, Typography} from "@mui/material";
import {nodeTypes} from "../../components/Node/customNode";
import {uuid} from "uuidv4";

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

export default function Canvas({id, map}) {
	const selector = (state) => ({
		nodes: state.nodes,
		edges: state.edges,
		fetch: state.fetch,
		post: state.post,
		onNodesChange: state.onNodesChange,
		onEdgesChange: state.onEdgesChange,
		onConnect: state.onConnect,
		onNodeCreate: state.onNodeCreate,
		onGenerateNodes: state.onGenerateNodes,
		onUpdateMap: state.onUpdateMap,
	});

	const user = process.env.REACT_APP_USERNAME || "Gblur";
	// const url = `https://api.github.com/users/${user}/repos`;

	const {
		nodes,
		edges,
		fetch,
		onNodesChange,
		onEdgesChange,
		onConnect,
		onNodeCreate,
		onGenerateNodes,
		onUpdateMap,
	} = useStore(selector, shallow);

	// function handleNodeClick(event) {
	// 	const currentNode = nodes.find((node) => {
	// 		return node.id === event.currentTarget.getAttribute("data-id");
	// 	});
	// 	if (currentNode?.branches) {
	// 		setbranchUrl(currentNode["branches"].replace("{/branch}", ""));
	// 	}
	// }

	useEffect(() => {
		if (id) {
			fetch(id);
		}
		return () => {};
	}, [id]);

	return (
		<>
			<Button
				onClick={() => {
					onNodeCreate(uuid());
				}}>
				Create Node
			</Button>
			<Button onClick={() => onUpdateMap(id)}>Save Map</Button>
			<ReactFlowProvider>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onEdgesChange={onEdgesChange}
					onNodesChange={onNodesChange}
					onConnect={onConnect}
					nodeTypes={nodeTypes}
					fitView>
					<Background style={{background: styles["color-bg"]}} />
					<Controls />
				</ReactFlow>
			</ReactFlowProvider>
		</>
	);
}
