import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import {Icon} from "../Icons";
import formControlStore from "../../store/formControls";
import {useRouter} from "next/router";
import Stack from "@mui/material/Stack";

const Heading = styled.header`
	text-align: center;
`;

const HeaderContainer = styled.nav`
	display: flex;
	width: 100%;
	justify-content: space-between;
	margin-bottom: 20px;
`;

export default function Header() {
	const router = useRouter();

	const openModal = formControlStore((state) => state.openModal);
	const closeModal = formControlStore((state) => state.closeModal);

	return (
		<Heading>
			<HeaderContainer>
				<Stack direction="row" spacing={1}>
					<Button
						onClick={() => {
							router.push("/maps");
							closeModal();
						}}
						variant="contained"
						sx={{fontSize: 16}}>
						<span>Home</span>
						<Icon.Home sx={{fontSize: 20}} />
					</Button>
					<Button
						onClick={() => {}}
						variant="contained"
						sx={{fontSize: 16}}>
						<span>Edit Map</span>
						<Icon.EditIcon sx={{fontSize: 20}} />
					</Button>
					<Button
						onClick={() => {}}
						variant="contained"
						sx={{fontSize: 16}}>
						<span>Delete Map</span>
						<Icon.DeleteIcon sx={{fontSize: 20}} />
					</Button>
					<Button
						onClick={openModal}
						variant="contained"
						sx={{fontSize: 16}}>
						<span>Create New Project</span>
						<Icon.AddCircleOutlineIcon sx={{fontSize: 25}} />
					</Button>
				</Stack>
			</HeaderContainer>
		</Heading>
	);
}
