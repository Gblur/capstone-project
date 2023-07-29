import GlobalStyle from "../styles";
import Head from "next/head";
import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react";
import { trpc } from "../utils/trpc";

function App({ Component, pageProps: { session, ...pageProps } }) {
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

export default trpc.withTRPC(App);
