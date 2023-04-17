import React from "react";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import EnhancedTable from "./Table";
import {styles} from "../Canvas/styles";
import {Icon} from "../Icons";
import ReactFlow, {Background, Controls} from "reactflow";
import {nodeTypes} from "../Node/customNode";
import {router} from "next/router";
import Canvas from "../Canvas";
import "reactflow/dist/style.css";

const DashboardContainer = styled.div`
	display: grid;
	grid-template-columns: 250px 1fr;
	height: calc(100vh - 200px);
	gap: 20px;
`;

const ProjectListContainer = styled.section`
	display: block;
	border: 1px solid var(--color-dashboard-border);
	border-radius: 4px;
	overflow-y: auto;
	padding: 5px;
	background: rgba(255, 255, 255, 0.9);
`;

const ProjectList = styled.ul`
	list-style: none;
	padding: 0;
`;

const InformationContainer = styled.section`
	display: flex;
	flex-direction: column;
`;

const MapPreview = styled.div`
	display: block;
	min-height: 500px;
	border: 1px solid var(--color-dashboard-border);
	margin-bottom: 20px;
	overflow: hidden;
	border-radius: 4px;
`;

const ProjectListItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-radius: 5px;
	padding: 10px;
	margin-bottom: 5px;
	cursor: pointer;
	&:hover {
		background: var(--color-hover-item);
	}
	&.selected {
		background: var(--color-background-item);
	}
`;

// const Table = styled.section`
// 	display: table;
// 	height: 100%;
// 	width: 100%;
// 	border: 2px solid var(--color-dashboard-border);
// 	padding: 20px;
// `;

export default function Dashboard({
	data,
	map,
	selectedItem,
	handleMapSelect,
	handleDelete,
	nodes,
	edges,
}) {
	return (
		<DashboardContainer>
			<ProjectListContainer>
				<h2>Project list</h2>
				<hr />
				{!data ? (
					<CircularProgress />
				) : (
					<ProjectList>
						{data.length ? (
							data.map((item) => {
								return (
									<ProjectListItem
										className={
											selectedItem === item
												? "selected"
												: ""
										}
										key={item._id}
										onClick={() =>
											handleMapSelect(item, item._id)
										}>
										<a>{item.name}</a>
										{selectedItem === item && (
											<span>
												<Icon.EditIcon
													onClick={() => {
														router.push(
															`/maps/${item._id}`
														);
													}}
													color="primary"
												/>
												<Icon.DeleteIcon
													onClick={() => {
														handleDelete(item._id);
													}}
													color="error"
												/>
											</span>
										)}
									</ProjectListItem>
								);
							})
						) : (
							<ProjectListItem>No Entry</ProjectListItem>
						)}
					</ProjectList>
				)}
			</ProjectListContainer>
			<InformationContainer>
				<MapPreview>
					<>
						<ReactFlow
							nodes={nodes}
							edges={edges}
							nodeTypes={nodeTypes}
							fitView>
							<Background
								style={{background: styles["color-bg"]}}
							/>
							<Controls />
						</ReactFlow>
					</>
				</MapPreview>
				<EnhancedTable map={map} />
			</InformationContainer>
		</DashboardContainer>
	);
}
