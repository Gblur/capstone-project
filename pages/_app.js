import GlobalStyle from "../styles";
import Head from "next/head";
import Layout from "../components/Layout";
import "../styles/globals.css"

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Capstone Project</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
