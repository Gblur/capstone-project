import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import {Icon} from "../Icons";
import formControlStore from "../../store/formControls";
import {useRouter} from "next/router";
import Profile from "../SignIn/Profile";

const Heading = styled.header`
	text-align: center;
	position: sticky;
	top: 0;
`;

const HeaderContainer = styled.nav`
	display: flex;
	width: 100%;
	padding: 10px;
	background: var(--color-bg-box-info);
	justify-content: space-between;
	margin-bottom: 20px;

	button {
		flex-direction: column;
		justify-content: space-between;
		font-size: 12px;
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
					Dashboard
				</Button>
				<Button onClick={openModal} variant="text" color="inherit">
					<Icon.AddCircleOutlineIcon sx={{fontSize: 36}} />
					New Project
				</Button>
				<Profile />
			</HeaderContainer>
		</Heading>
	);
}
