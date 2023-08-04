import React from "react";
import Header from "../Header";
import { useSession } from "next-auth/react";

export default function Layout({ children }) {
  // const { data: session } = useSession();

  // if (!session) {
  // 	return <>{children}</>;
  // }

  return (
    <>
      <Header />
      {children}
    </>
  );
}
