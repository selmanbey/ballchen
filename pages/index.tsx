import type { NextPage } from "next";
import Head from "next/head";

import { RecoilRoot } from "recoil";
import Game from "components/Game";
import Settings from "components/Settings";

const Home: NextPage = () => {
  return (
    <RecoilRoot>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Settings />
      <Game />
    </RecoilRoot>
  );
};

export default Home;
