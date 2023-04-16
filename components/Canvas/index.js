import React, {useEffect} from "react";
import ReactFlow, {Background, Controls, ReactFlowProvider} from "reactflow";
import {styles} from "./styles.js";
import useStore from "../../store";
import {shallow} from "zustand/shallow";
import Button from "@mui/material/Button";
import {nodeTypes} from "../../components/Node/customNode";
import {v4 as uuidv4} from "uuid";

export default function Canvas({id}) {
	const selector = (state) => ({
		nodes: state.nodes,
		edges: state.edges,
		fetchMap: state.fetchMap,
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
		fetchMap,
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
			fetchMap(id);
		}
		return () => {};
	}, [id]);

	return (
		<>
			<Button
				onClick={() => {
					onNodeCreate(uuidv4());
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
