import type { NextPage } from "next";
import Head from "next/head";

import HomePage from "./homepage";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dev Challenge</title>
        <meta
          name="description"
          content="AI workflows that run based on time and other triggers."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
    </>
  );
};

export default Home;
