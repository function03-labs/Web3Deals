/* eslint-disable @next/next/no-page-custom-font */
import { Provider } from 'react-redux'
import { store } from '../app/store'
import '../styles/globals.css'
import Head from 'next/head';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
    <Head>
    <link  
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@200;400;500;600;700&display=swap" 
          rel="stylesheet"
          />
    <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
    </>
  )
}

export default MyApp