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
import {Button} from "@mui/material";
import {Modal, Box, Typography} from "@mui/material";
import {useImmer} from "use-immer";
import {nodeTypes} from "../../components/Node/customNode";
import {uid} from "uid";
import useLocalStorageState from "use-local-storage-state";

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

export default function Canvas({id}) {
	const selector = (state) => ({
		map: state.map,
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
		createProject: state.createProject,
	});

	const user = process.env.REACT_APP_USERNAME || "Gblur";
	const url = `https://api.github.com/users/${user}/repos`;

	const {
		map,
		nodes,
		edges,
		createProject,
		fetch,
		onNodesChange,
		onEdgesChange,
		onConnect,
		onNodeCreate,
		onGenerateNodes,
		onUpdateMap,
	} = useStore(selector, shallow);

	const {data, isLoading} = useSWR(url);
	const [open, setOpen] = useState(false);
	const [projectCreated, setProjectCreated] = useLocalStorageState(
		"actionguards",
		{defaultValue: false}
	);
	const [branchUrl, setbranchUrl] = useImmer("");
	const branchData = useSWR(branchUrl);

	function handleNodeClick(event) {
		const currentNode = nodes.find((node) => {
			return node.id === event.currentTarget.getAttribute("data-id");
		});
		if (currentNode?.branches) {
			setbranchUrl(currentNode["branches"].replace("{/branch}", ""));
		}
	}

	useEffect(() => {
		// onGenerateNodes(data);
		fetch(id);
	}, [id]);

	return (
		<>
			<Button
				disabled={projectCreated}
				onClick={() => {
					createProject();
					setProjectCreated(true);
				}}>
				Create Project
			</Button>
			<Button
				onClick={() => {
					onNodeCreate(uid());
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
					onNodeClick={handleNodeClick}
					nodeTypes={nodeTypes}
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
