import GlobalStyle from "../styles";
import Head from "next/head";
import Layout from "../components/Layout";
import "../styles/globals.css"
import { SWRConfig } from "swr/_internal";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Capstone Project</title>
      </Head>
      <SWRConfig value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </>
  );
}
