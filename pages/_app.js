import GlobalStyle from "../styles";
import Head from "next/head";
import Layout from "../components/Layout";
import {SWRConfig} from "swr";

export default function App({Component, pageProps}) {
	return (
		<>
			<GlobalStyle />
			<Head>
				<title>Mindmap</title>
			</Head>
			<SWRConfig
				value={{
					fetcher: async (...args) => {
						const response = await fetch(...args);
						if (!response.ok) {
							throw new Error(
								`Request with ${JSON.stringify(args)} failed.`
							);
						}
						return await response.json();
					},
				}}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</SWRConfig>
		</>
	);
}
