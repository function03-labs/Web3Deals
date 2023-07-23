/* eslint-disable @next/next/no-page-custom-font */
import '../app/globals.css'
import Head from 'next/head';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
    <Head>
      <title>Web3Deals</title>
      <meta name="description" content="Find the best deals in the web3 space." />
      <meta name="keywords" content="Deals, Cryptocurrency, Web3, Blockchain, Bargain" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content="Web3Deals" />
      <meta property="og:description" content="Find the best deals in the web3 space." />
      <meta property="og:image" content="/path-to-your/image.jpg" />
      <meta property="og:url" content="https://yourwebsite.com" />
      <meta name="twitter:card" content="summary_large_image" />
      <link data-react-helmet="true" rel="icon" type="image/png" href="/Assets/favicon-32x32.png" sizes="32x32"></link>
      <link  href="https://fonts.googleapis.com/css2?family=Outfit:wght@200;400;500;600;700&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet"/>
    </Head>
    <Component {...pageProps} />
    </>
  )
}

export default MyApp