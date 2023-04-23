import React, {useEffect, useRef, useState} from "react";
import ReactFlow, {Background, Controls, ReactFlowProvider} from "reactflow";
import {styles} from "./styles.js";
import {nodeTypes} from "../../components/Node/customNode";
import Modal from "../Modal";
import {v4 as uuidv4} from "uuid";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import Stack from "@mui/material/Stack";

const NodeWindow = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`;

export default function Canvas({
	nodes,
	edges,
	onEdgesChange,
	onNodesChange,
	onConnect,
	onNodeCreate,
	modal,
	closeModal,
	openModal,
	user,
	updateNodeLabel,
	updateNodeType,
	updateNodeStatus,
	handlePostToNotion,
}) {
	let handle = useRef(null);

	const [branchUrl, setBranchUrl] = useState();
	const [currentData, setCurrentData] = useState();
	const [message, setMessage] = useState();

	function handleNodeClick(event) {
		const currentNode = nodes.find((node) => {
			return node.id === event.currentTarget.getAttribute("data-id");
		});
		openModal();
		if (currentNode?.branches) {
			setBranchUrl(currentNode["branches"].replace("{/branch}", ""));
		}
		if (currentNode?.type === "unbound") {
			// build data
			const data = currentNode;
			setCurrentData(data);
			console.log(data);
		}
	}

	function handleSubmitNodeData(e) {
		e.preventDefault();
		const form = new FormData(e.target);
		const data = Object.fromEntries(form);
		console.log(data);
		handlePostToNotion(data);
		closeModal();
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
			<Modal modal={modal} onClose={closeModal} openModal={openModal}>
				<NodeWindow>
					{currentData ? (
						<form onSubmit={handleSubmitNodeData}>
							<TextField
								name="title"
								defaultValue={currentData.data.label}
								onChange={(e) => {
									updateNodeLabel(
										currentData.id,
										e.target.value
									);
								}}
							/>
							<FormControl margin="normal" fullWidth>
								<InputLabel id="status-label">Type</InputLabel>
								<Select
									label="status"
									labelId="status-label"
									id="maptype-select"
									name="type"
									value={currentData.data.nodeType}
									// defaultValue={currentData.data.nodeType}
									onChange={(e) => {
										updateNodeType(
											currentData.id,
											e.target.value
										);
									}}>
									<MenuItem value="Issue">Issue</MenuItem>
									<MenuItem value="Branch">Branch</MenuItem>
								</Select>
							</FormControl>
							<FormControl margin="normal" fullWidth>
								<InputLabel id="status-label">
									Status
								</InputLabel>
								<Select
									label="status"
									labelId="status-label"
									id="maptype-select"
									name="status"
									value={currentData.data.status}
									// defaultValue={currentData.data.nodeType}
									onChange={(e) => {
										updateNodeStatus(
											currentData.id,
											e.target.value
										);
									}}>
									<MenuItem value="not started">
										Not Started
									</MenuItem>
									<MenuItem value="started">Started</MenuItem>
								</Select>
							</FormControl>
							<FormControl margin="normal" fullWidth>
								<TextField
									label="message"
									value={message}
									onChange={(e) => setMessage(e.target.value)}
									required
									name="message"
								/>
							</FormControl>
							<Stack margin={2} justifyContent="flex-end">
								<Button type="submit" variant="contained">
									Send to Notion
								</Button>
							</Stack>
						</form>
					) : (
						<p>No Data</p>
					)}
				</NodeWindow>
			</Modal>
		</>
	);
}
