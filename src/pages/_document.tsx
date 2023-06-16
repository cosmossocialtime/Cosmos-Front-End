import Document, { Head, Html, Main, NextScript } from "next/document";
export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;400;500;600;800;900&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body className="font-normal">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
