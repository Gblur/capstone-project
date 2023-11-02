import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useRouter } from "next/router";
import Google from "@mui/icons-material/Google";

const SignInSection = styled.section`
  display: grid;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(244, 244, 244, 0.7);
  width: 300px;
  height: 300px;
  border-radius: 7px;
  backdrop-filter: blur(4px);
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
      margin-bottom: 10px;
      width: 180px;
    }
  }
`;

export default function SignIn() {
  // const {data: session} = useSession();
  const router = useRouter();
  if (session) {
    router.push("/maps");
  }

  return (
    <SignInSection>
      <div>
        <h2>Sign in with</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            signIn();
          }}
        >
          Github
          <GitHubIcon sx={{ fontSize: 24, marginLeft: "5px" }} />
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            signIn();
          }}
        >
          Google
          <Google sx={{ fontSize: 24, marginLeft: "5px" }} />
        </Button>
      </div>
    </SignInSection>
  );
}
