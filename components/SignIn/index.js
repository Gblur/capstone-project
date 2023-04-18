import React from "react";
import styled from "styled-components";
import {useSession, signIn} from "next-auth/react";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import {useRouter} from "next/router";

const SignInSection = styled.section`
	display: grid;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: rgba(244, 244, 244, 0.7);
	width: 300px;
	height: 300px;
	margin: auto;
	border-radius: 7px;
	backdrop-filter: blur(4px);
	span {
		margin-left: 5px;
	}
`;

export default function SignIn() {
	const {data: session} = useSession();
	const router = useRouter();

	if (session) {
		router.push("/maps");
	}

	return (
		<SignInSection>
			<Button
				variant="contained"
				color="primary"
				onClick={() => {
					signIn();
				}}>
				<GitHubIcon sx={{fontSize: "24px"}} />
				<span>Sign with Github</span>
			</Button>
		</SignInSection>
	);
}
