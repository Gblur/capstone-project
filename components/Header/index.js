import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import {Icon} from "../Icons";
import formControlStore from "../../store/formControls";
import {useRouter} from "next/router";
import Profile from "../SignIn/Profile";

const Heading = styled.header`
	text-align: center;
`;

const HeaderContainer = styled.nav`
	display: flex;
	width: 100%;
	color: white;
	justify-content: space-between;
	margin-bottom: 20px;
	position: sticky;
	button {
		flex-direction: column;
		justify-content: space-between;
	}
	span {
		font-size: 12px;
	}
`;

export default function Header() {
	const router = useRouter();

	const openModal = formControlStore((state) => state.openModal);
	const closeModal = formControlStore((state) => state.closeModal);

	return (
		<Heading>
			<HeaderContainer>
				<Button
					onClick={() => {
						router.push("/maps");
						closeModal();
					}}
					variant="text"
					color="inherit">
					<Icon.Home sx={{fontSize: 36}} />
					<span>Dashboard</span>
				</Button>
				<Button onClick={openModal} variant="text" color="inherit">
					<Icon.AddCircleOutlineIcon sx={{fontSize: 36}} />
					<span>Create New Project</span>
				</Button>
				<Profile />
			</HeaderContainer>
		</Heading>
	);
}
