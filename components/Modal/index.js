import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import formControlStore from "../../store/formControls";
import ProjectForm from "../Form";
import {Typography} from "@mui/material";

const styledModalBox = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "80%",
	maxWidth: "500px",
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 2,
};

export default function CustomModal() {
	const modal = formControlStore((state) => state.modal);
	const onClose = formControlStore((state) => state.closeModal);

	return (
		<Modal
			component="section"
			open={modal}
			onClose={onClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description">
			<Box sx={styledModalBox}>
				<ProjectForm />
			</Box>
		</Modal>
	);
}
