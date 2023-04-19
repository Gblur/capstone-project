import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import formControlStore from "../../store/modalControls";
import ProjectForm from "../Form";

const styledModalBox = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "80%",
	maxWidth: "500px",
	borderRadius: "5px",
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 2,
};

export default function CustomModal({modal, onClose, children, openModal}) {
	return (
		<Modal
			component="section"
			open={modal}
			onClose={onClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description">
			<Box sx={styledModalBox}>{children}</Box>
		</Modal>
	);
}
