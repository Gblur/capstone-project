import GlobalStyle from "../styles";
import Head from "next/head";
import Layout from "../components/Layout";
import {SessionProvider} from "next-auth/react";

export default function App({Component, pageProps: {session, ...pageProps}}) {
	return (
		<>
			<GlobalStyle />
			<Head>
				<title>Mindmap</title>
			</Head>
			<SessionProvider session={session}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</SessionProvider>
		</>
	);
}
