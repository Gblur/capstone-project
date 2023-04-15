import React from "react";
import Box from "@mui/material/Button";
import Modal from "@mui/material/Modal";
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

export default function CustomModal() {
	const modal = formControlStore((state) => state.modal);
	const onClose = formControlStore((state) => state.closeModal);

	return (
		<Modal
			open={modal}
			onClose={onClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description">
			<Box sx={styleModalBox}>
				<ProjectForm />
			</Box>
		</Modal>
	);
}
