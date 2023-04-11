import EnhancedTable from "../Dashboard/Table";
import React from "react";
import styled from "styled-components";
import {Modal, Box, Typography} from "@mui/material";
import formControlStore from "../../store/formControls";
import ProjectForm from "../Form";

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

const MapPreview = styled.section`
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

export default function Dashboard() {
	const modal = formControlStore((state) => state.modal);
	const onClose = formControlStore((state) => state.closeModal);

	return (
		<>
			<DashboardContainer>
				<ProjectList>
					<h2>Project list</h2>
					<input type="text" />
				</ProjectList>
				<InformationContainer>
					<MapPreview />
					<EnhancedTable />
				</InformationContainer>
			</DashboardContainer>
			<Modal
				open={modal}
				onClose={onClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<Box sx={styleModalBox}>
					<ProjectForm />
				</Box>
			</Modal>
		</>
	);
}
