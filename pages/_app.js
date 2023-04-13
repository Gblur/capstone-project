import GlobalStyle from "../styles";
import Head from "next/head";
import Layout from "../components/Layout";
import {SWRConfig} from "swr/_internal";
import {KayakingSharp} from "@mui/icons-material";

export default function App({Component, pageProps}) {
	return (
		<>
			<GlobalStyle />
			<Head>
				<title>Capstone Project</title>
			</Head>
			<SWRConfig
				value={{
					fetcher: (resource) =>
						fetch(resource).then((res) => res.json()),
				}}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</SWRConfig>
		</>
	);
}
