import React, {useEffect, useRef, useState} from "react";
import ReactFlow, {Background, Controls, ReactFlowProvider} from "reactflow";
import {styles} from "./styles.js";
import {nodeTypes} from "../../components/Node/customNode";
import Modal from "../Modal";
import modalControlsStore from "../../store/modalControls.js";
import {v4 as uuidv4} from "uuid";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Canvas({
	nodes,
	edges,
	onEdgesChange,
	onNodesChange,
	onConnect,
	onNodeCreate,
}) {
	const [branchUrl, setBranchUrl] = useState(null);
	let handle = useRef(null);
	const modal = modalControlsStore((state) => state.modal);
	const onClose = modalControlsStore((state) => state.closeModal);
	const openModal = modalControlsStore((state) => state.openModal);

	const {data, isLoading} = useSWR(branchUrl, fetcher);

	function handleNodeClick(event) {
		const currentNode = nodes.find((node) => {
			return node.id === event.currentTarget.getAttribute("data-id");
		});
		if (currentNode?.branches) {
			openModal();
			setBranchUrl(currentNode["branches"].replace("{/branch}", ""));
		}
	}

	function onConnectStart(event) {
		handle.current = event.currentTarget.getAttribute("data-nodeid");
	}

	function onConnectEnd() {
		onNodeCreate(handle.current, uuidv4());
	}

	return (
		<>
			<ReactFlowProvider>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onEdgesChange={onEdgesChange}
					onNodesChange={onNodesChange}
					onConnectStart={onConnectStart}
					onConnect={onConnect}
					onConnectEnd={onConnectEnd}
					onNodeClick={handleNodeClick}
					nodeTypes={nodeTypes}
					minZoom={0.25}
					fitView>
					<Background
						style={{
							background: styles["color-bg"],
						}}
					/>
					<Controls />
				</ReactFlow>
			</ReactFlowProvider>
			<Modal modal={modal} onClose={onClose} openModal={openModal}>
				{branchUrl && data && !isLoading ? (
					data.map((branch) => {
						return <p key={branch.name}>{branch.name}</p>;
					})
				) : (
					<h1>Fetch Data...</h1>
				)}
			</Modal>
		</>
	);
}
