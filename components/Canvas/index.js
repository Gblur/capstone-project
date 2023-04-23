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
import BugReportIcon from "@mui/icons-material/BugReport";
import styled from "styled-components";

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
}) {
	let handle = useRef(null);

	const [branchUrl, setBranchUrl] = useState();
	const [currentData, setCurrentData] = useState();

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

	function handleUpdateNodeData(event) {}

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
						<form action="">
							<TextField
								defaultValue={currentData.data.label}
								onChange={(e) => {
									updateNodeLabel(
										currentData.id,
										e.target.value
									);
								}}
							/>
							<FormControl margin="normal" fullWidth>
								<InputLabel id="status-label">
									Status
								</InputLabel>
								<Select
									label="status"
									labelId="status-label"
									id="maptype-select"
									name="status"
									defaultValue={currentData.data.nodeType}
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
							<Button>Send to Notion</Button>
							<FormControl margin="normal" fullWidth>
								<TextField
									label="message"
									onChange={(e) => setName(e.target.value)}
									required
									name="message"
								/>
							</FormControl>
						</form>
					) : (
						<p>No Data</p>
					)}
				</NodeWindow>
				{/* {data && !isLoading ? (
					data.map((branch) => {
						return <p key={branch.name}>{branch.name}</p>;
					})
				) : (
					<h1>Fetch Data...</h1>
				)} */}
			</Modal>
		</>
	);
}
