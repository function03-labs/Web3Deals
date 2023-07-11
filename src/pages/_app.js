/* eslint-disable @next/next/no-page-custom-font */
import { Provider } from 'react-redux'
import { store } from '../app/store'
import '../styles/globals.css'
import Head from 'next/head';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
    <Head>
    <link data-react-helmet="true" rel="icon" type="image/png" href="https://static.npmjs.com/b0f1a8318363185cc2ea6a40ac23eeb2.png" sizes="32x32"></link>
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