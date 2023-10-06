import GlobalStyle from "../styles";
import Head from "next/head";
import Layout from "../components/Layout";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo-client";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Mindmap</title>
      </Head>
      {/* <SessionProvider session={session}>  */}
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
      {/* </SessionProvider> */}
    </>
  );
}
