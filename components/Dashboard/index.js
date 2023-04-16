import React, {useEffect, useState} from "react";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import EnhancedTable from "./Table";
import {styles} from "../Canvas/styles";
import ReactFlow, {Background, Controls, ReactFlowProvider} from "reactflow";
import {nodeTypes} from "../Node/customNode";
import {selectClasses} from "@mui/material";

const DashboardContainer = styled.div`
	display: grid;
	grid-template-columns: 250px 1fr;
	height: calc(100vh - 200px);
	gap: 20px;
`;

const ProjectListContainer = styled.section`
	display: block;
	border: 2px solid var(--color-dashboard-border);
	overflow-y: auto;
	padding: 20px;
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
	border: 2px solid var(--color-dashboard-border);
	margin-bottom: 20px;
	overflow: hidden;
`;

const ProjectListItem = styled.li`
	border-radius: 5px;
	padding: 10px;
	cursor: pointer;
	&:hover {
		background: var(--color-hover-item);
	}
	&.selected {
		background: var(--color-hover-item);
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
	nodes,
	edges,
}) {
	return (
		<DashboardContainer>
			<ProjectListContainer>
				<h2>Project list</h2>
				{!data.length ? (
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
										<hr />
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
					<ReactFlow
						nodes={nodes}
						edges={edges}
						nodeTypes={nodeTypes}
						fitView>
						<Background style={{background: styles["color-bg"]}} />
						<Controls />
					</ReactFlow>
				</MapPreview>
				<EnhancedTable map={map} />
			</InformationContainer>
		</DashboardContainer>
	);
}
