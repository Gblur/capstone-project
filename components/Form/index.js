import {Button} from "@mui/material";
import React from "react";
import styled from "styled-components";
import {useRouter} from "next/router";
import useStore from "../../store";
import {uid} from "uid";

const Form = styled.form`
	display: block;
	flex-direction: column;
	justify-content: center;

	fieldset {
		display: flex;
		flex-direction: column;
	}

	input,
	select {
		margin: 5px 0;
		border: none;
		border-bottom: 1px solid var(--color-dashboard-border);
	}
	textarea {
		margin: 5px 0;
	}
`;

const initialNodes = [
	{
		id: uid(),
		type: "parent",
		data: {
			label: "Root",
			background: "var(--color-node-parent-bg)",
			type: "root",
			status: "unknown",
		},
		position: {x: 250, y: 25},
	},
];

export default function ProjectForm() {
	const router = useRouter();

	const onSubmitForm = async (event) => {
		event.preventDefault();
		const form = new FormData(event.target);
		const data = Object.fromEntries(form);
		const response = await fetch(`/api`, {
			method: "POST",
			body: JSON.stringify({
				...data,
				nodes: initialNodes,
				edges: [{id: uid()}],
			}),
			headers: {"Content-Type": "application/json"},
		});
		if (response.ok) {
			const {_id} = await response.json();
			router.push(`/maps/${_id}`);
		}
	};

	return (
		<>
			<Form method="POST" onSubmit={onSubmitForm}>
				<fieldset>
					<legend>Create Project</legend>
					<label htmlFor="nameProject">Name</label>
					<input id="nameProject" name="name" type="text" required />
					<label htmlFor="teamProject">Team</label>
					<select
						name="team"
						id="teamProject"
						defaultValue=""
						required>
						<option value="DevOps">DevOps</option>
						<option value="Frontend">Frontend</option>
					</select>
					<label htmlFor="typeProject">Type</label>
					<select name="mapType" id="typeProject" defaultValue="">
						<option value="Repos">Repos</option>
						<option value="None">None</option>
					</select>
					<label htmlFor="descriptionProject">Description</label>
					<textarea
						id="descriptionProject"
						rows="10"
						name="description"
						type="text"
					/>
				</fieldset>
				<Button type="submit">Submit</Button>
			</Form>
		</>
	);
}
