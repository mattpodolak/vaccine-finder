import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';

import { initGA, logPageView } from '@/lib/analytics';
import '@/styles/globals.css';
import '@/styles/Tooltip.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, [router]);
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
