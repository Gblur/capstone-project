import React, {useState, useEffect, useCallback, useRef} from "react";
import ReactFlow, {
	Background,
	Controls,
	ReactFlowProvider,
	useNodesState,
	useEdgesState,
	useReactFlow,
} from "reactflow";
import {styles} from "./styles.js";
import useSWR from "swr";
import {CircularProgress} from "@mui/material";
import {Modal, Box, Typography} from "@mui/material";
import {useImmer} from "use-immer";
import {nodeTypes} from "../../components/Node/customNode";

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

export default function Canvas({filter}) {
	const user = "Gblur";
	const url = `https://api.github.com/users/${user}/repos`;
	const initialNode = [
		{
			id: "1",
			type: "input",
			data: {label: "Map Name"},
			position: {x: 250, y: 25},
			selectable: false,
		},
	];

	const initialEdge = [];

	const {data, isLoading} = useSWR(url);
	const [testnode, setTestNode, onNodesChange] = useNodesState(initialNode);
	const [testedge, setTestEdge, onEdgesChange] = useEdgesState(initialEdge);
	const [open, setOpen] = useState(false);
	const [branchUrl, setbranchUrl] = useImmer("");
	const branchData = useSWR(branchUrl || "");
	const connectingNodeId = useRef(null);

	let base = -300;
	let id = 1000;
	const getId = () => `${id++}`;

	const onConnectStart = useCallback((_, {nodeId}) => {
		connectingNodeId.current = nodeId;
	}, []);

	const onConnectEnd = useCallback((event) => {
		const targetIsPane =
			event.target.classList.contains("react-flow__pane");
		if (targetIsPane) {
			// we need to remove the wrapper bounds, in order to get the correct position
			// const {top, left} =
			// 	reactFlowWrapper.current.getBoundingClientRect();
			const id = getId();
			const newNode = {
				id,
				// we are removing the half of the node width (75) to center the new node
				position: {x: 100, y: 100},
				data: {label: `Node ${id}`},
				parentNode: connectingNodeId.current,
				type: "child",
			};

			setTestNode((nds) => nds.concat(newNode));
			setTestEdge((eds) =>
				eds.concat({
					id,
					source: connectingNodeId.current,
					target: id,
				})
			);
		}
	}, []);

	function handleNodeClick(event) {
		const currentNode = testnode.find((node) => {
			return node.id === event.currentTarget.getAttribute("data-id");
		});
		if (currentNode?.branches) {
			setbranchUrl(currentNode["branches"].replace("{/branch}", ""));
		}
	}

	function filteredData(data, filter) {
		if (data) {
			return data.filter((item) => {
				if (filter) {
					return item.language === filter;
				}
				return item;
			});
		}
	}

	const filterData = filteredData(data, filter);

	function addChilds() {
		// map through initialNode and update the state by adding new elements to array

		setTestNode([
			...initialNode,
			...filterData.map((item) => {
				return {
					id: item["node_id"],
					data: {
						label: item.name,
						status: item.visibility,
						background: "#99d5ff",
					},
					position: {
						x: filterData.length > 10 ? 0 : (base += 200),
						y: filterData.length > 10 ? (base += 100) : 100,
					},
					parentNode: "1",
					type: "child",
					branches: item["branches_url"],
				};
			}),
		]);
	}

	function connectChilds() {
		setTestEdge([
			...filterData.map((item) => {
				return {
					id: item["node_id"],
					source: "1",
					target: item["node_id"],
					animated: true,
				};
			}),
		]);
	}

	useEffect(() => {
		if (!isLoading) {
			console.log(data);
			addChilds();
			connectChilds();

			return () => {};
		}
	}, [isLoading, filter]);

	console.log(testnode);

	if (isLoading) return <CircularProgress />;

	return (
		<>
			<ReactFlowProvider>
				<ReactFlow
					nodes={testnode}
					edges={testedge}
					onEdgesChange={onEdgesChange}
					onNodeClick={handleNodeClick}
					onNodesChange={onNodesChange}
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
