import Button from "@mui/material/Button";
import React, {useState} from "react";
import styled from "styled-components";
import {useRouter} from "next/router";
import useStore from "../../store";
import Stack from "@mui/material/Stack";
import {useSession} from "next-auth/react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

const Form = styled.form`
	// fieldset {
	// 	display: flex;
	// 	flex-direction: column;
	// }

	// input,
	// select {
	// 	margin: 5px 0;
	// 	border: none;
	// 	border-bottom: 1px solid var(--color-dashboard-border);
	// }
	// textarea {
	// 	margin: 5px 0;
	// }
	// button {
	// 	float: right;
	// }
`;

export default function ProjectForm() {
	const createPost = useStore((state) => state.createMap);
	const router = useRouter();
	const {data: session} = useSession();
	const [name, setName] = useState("");
	const [team, setTeam] = useState("DevOps");
	const [mapType, setMapType] = useState("Repos");
	const [description, setDescription] = useState("");

	console.log(session);
	const handleSubmitForm = (event) => {
		event.preventDefault();
		const form = new FormData(event.target);
		const data = Object.fromEntries(form);
		createPost(data, router, session?.user?.name);
	};

	return (
		<form onSubmit={handleSubmitForm}>
			<FormControl margin="normal" fullWidth>
				<TextField
					label="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
					name="name"
				/>
			</FormControl>
			<FormControl margin="normal" fullWidth>
				<InputLabel id="team-select-label">Team</InputLabel>
				<Select
					label="Team"
					name="team"
					labelId="team-select-label"
					id="team-select"
					value={team}
					onChange={(e) => setTeam(e.target.value)}
					required>
					<MenuItem value="DevOps">DevOps</MenuItem>
					<MenuItem value="Frontend">Frontend</MenuItem>
				</Select>
			</FormControl>
			<FormControl margin="normal" fullWidth>
				<InputLabel id="maptype-select-label">Template</InputLabel>
				<Select
					label="Template"
					labelId="maptype-select-label"
					id="maptype-select"
					value={mapType}
					name="mapType"
					onChange={(e) => setMapType(e.target.value)}>
					<MenuItem value="Repos">Repos</MenuItem>
					<MenuItem value="None">None</MenuItem>
				</Select>
			</FormControl>
			<FormControl margin="normal" fullWidth>
				<TextField
					label="Description"
					name="description"
					multiline
					rows={4}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</FormControl>
			<Stack
				justifyContent={"flex-end"}
				spacing={2}
				marginTop={2}
				direction="row">
				<Button variant="contained" type="submit">
					Submit
				</Button>
				<Button variant="contained" type="reset">
					Clear
				</Button>
			</Stack>
		</form>
	);
}
