import React from "react";
import Image from "next/image";
import {useSession, signIn, signOut} from "next-auth/react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import styled from "styled-components";
import Button from "@mui/material/Button";

const ProfileImage = styled.img`
	border-radius: 50%;
	width: 36px;
	height: 36px;
`;

export default function Profile() {
	const {data: session, status} = useSession();

	return (
		<Button variant="text" color="inherit" onClick={() => signOut()}>
			<ProfileImage src={session?.user?.image} alt="User Account" />
			Sign out
		</Button>
	);
}
