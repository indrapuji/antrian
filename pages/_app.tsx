/* eslint-disable @typescript-eslint/no-explicit-any */
import 'styles/global.scss';

import GoTop from 'components/GoTop';
import Loader from 'components/Loader';
import MetaSeo from 'components/MetaSeo';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    router.events.on('routeChangeStart', () => setLoading(true));
    router.events.on('routeChangeComplete', () => setLoading(false));

    return () => {
      router.events.off('routeChangeStart', () => setLoading(true));
      router.events.off('routeChangeComplete', () => setLoading(false));
    };
  }, [router]);

  return (
    <>
      <MetaSeo />

      <Component {...pageProps} />

      {/* Preloader */}
      <Loader loading={loading} />

      {/* Go Top Button */}
      <GoTop scrollStepInPx={50} delayInMs={10.5} />
    </>
  );
};

export default MyApp;
