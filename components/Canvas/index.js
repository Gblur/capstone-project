import React, {useEffect} from "react";
import ReactFlow, {Background, Controls, ReactFlowProvider} from "reactflow";
import {styles} from "./styles.js";
import {nodeTypes} from "../../components/Node/customNode";

export default function Canvas({
	id,
	nodes,
	edges,
	onEdgesChange,
	onNodesChange,
	onConnect,
	fetchMap,
}) {
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
	}, []);

	return (
		<>
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
