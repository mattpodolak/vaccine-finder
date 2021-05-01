import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta property="og:title" content="Find a Vaccine" />
          <meta
            name="description"
            content="Easily find a COVID-19 vaccination site near you or get notified when you become eligible."
          />
          <meta
            property="og:description"
            content="Easily find a COVID-19 vaccination site near you or get notified when you become eligible."
          />
          <meta
            property="og:image"
            content="https://findavaccine.ca/banner.png"
          />
          <meta
            name="keywords"
            content="covid-19, vaccines, vaccination, hotspot vaccine, popup vaccine, pop-up vaccine, toronto, toronto vaccines, pop up vaccine, vaccine clinic, hot spot vaccine, vaccine, canada vaccines"
          />
          <meta name="author" content="Matthew Podolak" />
          <meta name="msapplication-TileColor" content="#A8E6DB" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="apple-touch-icon.png"
          />
          <link rel="icon" type="image/x-icon" href="favicon.ico" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="favicon-16x16.png"
          />
          <link rel="manifest" href="site.webmanifest" />
          <link rel="mask-icon" href="safari-pinned-tab.svg" color="#abdddf" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
