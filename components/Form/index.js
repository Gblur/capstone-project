import {Button} from "@mui/material";
import React from "react";
import useStore from "../../store";
import {shallow} from "zustand/shallow";
import styled from "styled-components";

const Form = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 20px;
`;
const selector = (state) => ({
	createProject: state.createProject,
});

export default function ProjectForm() {
	const {createProject} = useStore(selector, shallow);

	return (
		<>
			<h2>Create Project</h2>
			<Form onSubmit={createProject}>
				<input type="text" />
				<input type="text" />
				<input type="text" />
				<input type="text" />
				<Button type="submit">Submit</Button>
			</Form>
		</>
	);
}
