import React from "react";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";

const DashboardContainer = styled.div`
	display: grid;
	grid-template-columns: 250px 1fr;
	height: calc(100vh - 150px);
	gap: 20px;
`;

const ProjectListContainer = styled.section`
	display: block;
	border: 2px solid var(--color-dashboard-border);
	overflow-y: auto;
	padding: 20px;
`;

const InformationContainer = styled.section`
	display: flex;
	flex-direction: column;
`;

const MapPreview = styled.div`
	display: block;
	height: 50%;
	border: 2px solid var(--color-dashboard-border);
	margin-bottom: 20px;
	overflow: hidden;
`;

const ProjectList = styled.ul`
	list-style: none;
	padding: 0;
`;

const ProjectListItem = styled.li`
	border-radius: 5px;
	padding: 10px;
	cursor: pointer;
	&:hover {
		background: var(--color-node-unbound-bg);
	}
`;

// const Table = styled.section`
// 	display: table;
// 	height: 100%;
// 	width: 100%;
// 	border: 2px solid var(--color-dashboard-border);
// 	padding: 20px;
// `;

export default function Dashboard({data, onRouteChange}) {
	return (
		<DashboardContainer>
			<ProjectListContainer>
				<h2>Project list</h2>
				{!data ? (
					<CircularProgress />
				) : (
					<ProjectList>
						{data.length ? (
							data.map(({_id, name}) => {
								return (
									<ProjectListItem
										key={_id}
										onClick={() => onRouteChange(_id)}>
										{name}
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
				<MapPreview />
			</InformationContainer>
		</DashboardContainer>
	);
}
