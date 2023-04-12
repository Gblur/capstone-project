import React from "react";
import {Home} from "@mui/icons-material";
import {Button} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import styled from "styled-components";
import formControlStore from "../../store/formControls";
import {useRouter} from "next/router";

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

	return (
		<Heading>
			<HeaderContainer>
				<Button
					onClick={() => router.push("/maps")}
					variant="contained"
					sx={{fontSize: 16}}>
					<span>Home</span>
					<Home sx={{fontSize: 20}} />
				</Button>
				<Button
					onClick={openModal}
					variant="contained"
					sx={{fontSize: 16}}>
					<span>Create New Project</span>
					<AddCircleOutlineIcon sx={{fontSize: 25}} />
				</Button>
			</HeaderContainer>
		</Heading>
	);
}
