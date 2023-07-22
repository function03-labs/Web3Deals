/* eslint-disable @next/next/no-page-custom-font */

import '../app/globals.css'
import Head from 'next/head';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
    <Head>
      
    <link data-react-helmet="true" rel="icon" type="image/png" href="/Assets/favicon-32x32.png" sizes="32x32"></link>
    <link  
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@200;400;500;600;700&display=swap" 
          rel="stylesheet"
          />
    <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp