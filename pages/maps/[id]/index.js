import React, {useState, useEffect} from "react";
import Canvas from "../../../components/Canvas";
import "reactflow/dist/style.css";
import {shallow} from "zustand/shallow";
import Button from "@mui/material/Button";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import {useRouter} from "next/router";
import useStore from "../../../store";
import useSWR from "swr";
import {v4 as uuidv4} from "uuid";
import {useSession} from "next-auth/react";
import modalControlsStore from "../../../store/modalControls";

const MapInfoBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 15px;
	background: var(--color-bg-box-info);
	word-wrap: break-word;
	margin-bottom: 20px;
	border-radius: 4px;
`;

const MapInfoBoxHead = styled.article`
	padding: 0 10px;
`;

const selector = (state) => ({
	loading: state.loading,
	map: state.map,
	nodes: state.nodes,
	edges: state.edges,
	fetchMap: state.fetchMap,
	fetchRepos: state.fetchRepos,
	repos: state.repos,
	post: state.post,
	onNodesChange: state.onNodesChange,
	onEdgesChange: state.onEdgesChange,
	onConnect: state.onConnect,
	onNodeCreate: state.onNodeCreate,
	onGenerateNodes: state.onGenerateNodes,
	onUpdateMap: state.onUpdateMap,
});
export default function MapDetailsPage() {
	const {
		loading,
		map,
		nodes,
		edges,
		repos,
		fetchMap,
		fetchRepos,
		onNodesChange,
		onEdgesChange,
		onConnect,
		onNodeCreate,
		onGenerateNodes,
		onUpdateMap,
	} = useStore(selector, shallow);

	const modal = modalControlsStore((state) => state.modal);
	const closeModal = modalControlsStore((state) => state.closeModal);
	const openModal = modalControlsStore((state) => state.openModal);

	const {data: session, status} = useSession();

	const router = useRouter();
	const {
		query: {id},
	} = router;

	useEffect(() => {
		closeModal();
		if (id) {
			fetchMap(id);
			console.log(
				"General Check",
				map.mapType === "Repos" && !map.nodes.includes("child")
			);
			if (map.mapType === "Repos" && !map.nodes.includes("child")) {
				fetchRepos(`/api/auth/github`);
				setTimeout(() => {
					if (!loading) onGenerateNodes(repos);
				}, 600);
			}
		}
	}, [map._id]);

	if (!router.isReady) return <CircularProgress />;

	return (
		<main
			style={{
				height: `100vh`,
			}}>
			<MapInfoBox>
				<MapInfoBoxHead>
					<h3>{map.name}</h3>
					<p>{map.description}</p>
				</MapInfoBoxHead>
			</MapInfoBox>
			<section style={{height: "65%"}}>
				<div style={{background: "rgba(244,244,244,0.9)"}}>
					<Button onClick={() => onUpdateMap(id)}>Save Map</Button>
				</div>
				<Canvas
					user={session?.user?.name}
					nodes={nodes}
					edges={edges}
					onConnect={onConnect}
					onNodeCreate={onNodeCreate}
					fetchMap={fetchMap}
					onEdgesChange={onEdgesChange}
					onNodesChange={onNodesChange}
					map={map}
					id={id}
					modal={modal}
					closeModal={closeModal}
					openModal={openModal}
				/>
			</section>
		</main>
	);
}
