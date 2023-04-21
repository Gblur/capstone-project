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

	const [filter, setFilter] = useState("HTML");
	const {data: session, status} = useSession();

	const router = useRouter();
	const {
		query: {id},
	} = router;

	function checkIfTemplateAvailable(template, repos, parentID) {
		if (template === "Repos" && parentID) {
			fetchRepos(
				`https://api.github.com/users/${session?.user?.name}/repos`
			);
			onGenerateNodes(repos, filter, parentID);
		} else return;
	}

	useEffect(() => {
		if (id) {
			fetchMap(id);
		}
		closeModal();
		if (!nodes[1]?.type) {
			if (!loading) {
				setTimeout(() => {
					checkIfTemplateAvailable(map.mapType, repos, nodes[0]?.id);
				}, 1500);
			}
		}
		return () => {};
	}, []);

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
					nodes={nodes}
					edges={edges}
					onConnect={onConnect}
					onNodeCreate={onNodeCreate}
					fetchMap={fetchMap}
					onEdgesChange={onEdgesChange}
					onNodesChange={onNodesChange}
					map={map}
					id={id}
					filter={filter}
					modal={modal}
					closeModal={closeModal}
					openModal={openModal}
				/>
			</section>
		</main>
	);
}
