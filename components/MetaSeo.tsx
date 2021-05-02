/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextSeo } from 'next-seo';
import React from 'react';

interface TheProps {
  title?: string;
  description?: string;
}

const MetaSeo = ({ title, description }: TheProps): JSX.Element => {
  return (
    <>
      <NextSeo
        title={`${title ? `${title} - ` : ''}${
          process.env.NEXT_PUBLIC_SEO_TITLE
        }`}
        description={`${description ? `${description} - ` : ''}${
          process.env.NEXT_PUBLIC_SEO_DESCRIPTION
        }`}
        openGraph={{
          type: process.env.NEXT_PUBLIC_SEO_OG_TYPE,
          locale: process.env.NEXT_PUBLIC_SEO_OG_LOCALE,
          url: process.env.NEXT_PUBLIC_SEO_OG_URL,
          site_name: process.env.NEXT_PUBLIC_SEO_OG_SITE_NAME,
        }}
      />
    </>
  );
};

MetaSeo.defaultProps = {
  title: null,
  description: null,
};

export default MetaSeo;
