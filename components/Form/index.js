import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import useStore from "../../store";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useMutation } from "@apollo/client";
import POSTMAP from "../../graphql/gql/postMap.gql";

export default function ProjectForm() {
  const createPost = useStore((state) => state.createMap);

  const [postMap] = useMutation(POSTMAP);

  const router = useRouter();
  // const {data: session} = useSession();
  const [name, setName] = useState("");
  const [team, setTeam] = useState("DevOps");
  const [mapType, setMapType] = useState("Repos");
  const [description, setDescription] = useState("");

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = Object.fromEntries(form);
    postMap({ variables: { input: data } });
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
          required
        >
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
          onChange={(e) => setMapType(e.target.value)}
        >
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
        direction="row"
      >
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
