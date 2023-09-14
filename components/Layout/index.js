import React from "react";
import Header from "../Header";

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
