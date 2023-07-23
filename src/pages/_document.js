import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
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
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
