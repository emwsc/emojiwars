/* eslint-disable react/prop-types */
import React from "react";
import Head from "next/head";

import "nes.css/css/nes.min.css";

const App = ({ Component, pageProps }) => {

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <title>Emoji Wars</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <style jsx global>{`
        :root {
          --light-blue: #4e6acd;
        }

        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          height: 100vh;
          font-family: "Press Start 2P", cursive;
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
};

export default App;
