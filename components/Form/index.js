import {Button} from "@mui/material";
import React from "react";
import styled from "styled-components";
import {useRouter} from "next/router";
import useStore from "../../store";

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

export default function ProjectForm() {
	const router = useRouter();
	const onPost = useStore((state) => state.onPost);

	const onSubmitForm = async (event) => {
		event.preventDefault();
		const form = new FormData(event.target);
		const data = Object.fromEntries(form);
		const response = await fetch(`/api`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {"Content-Type": "application/json"},
		});
		if (response.ok) {
			const {_id} = await response.json();
			onPost(data);
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
					<select name="type" id="teamProject" defaultValue="">
						<option value="">DevOps</option>
						<option value="">Frontend</option>
					</select>
					<label htmlFor="typeProject">Type</label>
					<select name="type" id="typeProject" defaultValue="">
						<option value="">Repos</option>
						<option value="">None</option>
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
