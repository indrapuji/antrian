import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

class MyDocument extends Document {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <>
        <Html
          lang="en"
          className="text-base-custom text-cool-gray-700 dark:text-cool-gray-100 antialiased"
        >
          <Head>
            {/* <link rel="icon" type="image/png" href="/images/favicon.png" /> */}
          </Head>
          <body className="min-h-screen bg-cool-gray-100 dark:bg-cool-gray-900">
            <Main />
            <NextScript />
          </body>
        </Html>
      </>
    );
  }
}

export default MyDocument;
