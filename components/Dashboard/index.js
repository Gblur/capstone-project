import EnhancedTable from "../Dashboard/Table";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Modal, Box, Typography, CircularProgress, Button} from "@mui/material";

const DashboardContainer = styled.div`
	display: grid;
	grid-template-columns: 250px 1fr;
	height: calc(100vh - 150px);
	gap: 20px;
`;

const ProjectList = styled.section`
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
			<ProjectList>
				<h2>Project list</h2>
				<ul>
					{data.length ? (
						data.map(({_id, name}) => {
							return (
								<li key={_id}>
									<Button
										type="button"
										onClick={() => onRouteChange(_id)}>
										{name}
									</Button>
								</li>
							);
						})
					) : (
						<li>No Entry</li>
					)}
				</ul>
			</ProjectList>
			<InformationContainer>
				<MapPreview />
				<EnhancedTable />
			</InformationContainer>
		</DashboardContainer>
	);
}
