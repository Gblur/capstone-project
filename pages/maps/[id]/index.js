import React, {useState} from "react";
import Canvas from "../../../components/Canvas";
import "reactflow/dist/style.css";
import {shallow} from "zustand/shallow";
import Button from "@mui/material/Button";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import {useRouter} from "next/router";
import useStore from "../../../store";
import {v4 as uuidv4} from "uuid";

const MapInfoBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 15px;
	background: var(--color-bg-box-info);
`;

const MapInfoBoxText = styled.div`
	display: block;
	padding: 10px;
`;

export default function MapDetailsPage() {
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

	const [filter, setFilter] = useState("HTML");
	const map = useStore((state) => state.map);
	const router = useRouter();
	const {
		query: {id},
	} = router;

	if (!router.isReady) return <CircularProgress />;

	return (
		<main style={{height: `calc(100vh - 250px)`}}>
			<MapInfoBox>
				<MapInfoBoxText>
					<h2>{map.name}</h2>
					<p>{map.description}</p>
				</MapInfoBoxText>
				<div>
					<Button
						onClick={() => {
							onNodeCreate(uuidv4());
						}}>
						Create Node
					</Button>
					<Button onClick={() => onUpdateMap(id)}>Save Map</Button>
				</div>
			</MapInfoBox>
			<Canvas
				nodes={nodes}
				edges={edges}
				onConnect={onConnect}
				fetchMap={fetchMap}
				onEdgesChange={onEdgesChange}
				onNodesChange={onNodesChange}
				map={map}
				id={id}
				filter={filter}
			/>
		</main>
	);
}
