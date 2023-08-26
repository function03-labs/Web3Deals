/* eslint-disable @next/next/no-page-custom-font */
import '../app/globals.css'
import Head from 'next/head';
import {SessionProvider } from "next-auth/react"

const MyApp = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
    <Head>
      <title>Web3Deals</title>
      <meta name="description" content="Find the latest deals in the web3 space." />
      <meta name="keywords" content="Deals, Cryptocurrency, Web3, Blockchain, Bargain" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content="Web3Deals" />
      <meta property="og:description" content="Find the latest deals in the web3 space." />
      <meta property="og:image" content="/path-to-your/image.jpg" />
      <meta property="og:url" content="https://web3deals.info" />
      <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#fff" />

      <meta name="twitter:card" content="summary_large_image" />
      <link data-react-helmet="true" rel="icon" type="image/png" href="/assets/favicon-32x32.png" sizes="32x32"></link>
      <link  href="https://fonts.googleapis.com/css2?family=Outfit:wght@200;400;500;600;700&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet"/>
    </Head>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp