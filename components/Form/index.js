import React, { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import useStore from "../../store";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useMutation, useSubscription } from "@apollo/client";
import POSTMAP from "../../graphql/gql/postMap.gql";
import SUBSCRIBE from "../../graphql/gql/updatePost.gql";
import { v4 as uuidv4 } from "uuid";

const initialNodes = (label) => [
  {
    id: uuidv4(),
    type: "parent",
    data: {
      label: label,
      background: "var(--color-node-parent-bg)",
      type: "root",
      status: "unknown",
    },
    position: { x: 250, y: 25 },
  },
];
const initialEdge = JSON.stringify([]);

export default function ProjectForm() {
  const createPost = useStore((state) => state.createMap);

  const [postMap] = useMutation(POSTMAP);

  const router = useRouter();
  // const {data: session} = useSession();
  const [formInput, setFormInput] = useState((prev) => ({
    ...prev,
    name: "",
    team: "",
    mapType: "Repos",
    description: "",
  }));

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = Object.fromEntries(form);
    postMap({
      variables: {
        object: {
          ...data,
          nodes: JSON.stringify(
            initialNodes(data?.mapType === "Repos" ? "Repos" : "Root")
          ),
          edges: initialEdge,
        },
      },
    });
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <FormControl margin="normal" fullWidth>
        <TextField
          label="Name"
          value={formInput.name}
          onChange={(e) =>
            setFormInput((prev) => ({ ...prev, name: e.target.value }))
          }
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
          value={formInput.team}
          onChange={(e) =>
            setFormInput((prev) => ({ ...prev, team: e.target.value }))
          }
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
          value={formInput.mapType}
          name="mapType"
          onChange={(e) =>
            setFormInput((prev) => ({ ...prev, mapType: e.target.value }))
          }
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
          value={formInput.description}
          onChange={(e) =>
            setFormInput((prev) => ({ ...prev, description: e.target.value }))
          }
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
