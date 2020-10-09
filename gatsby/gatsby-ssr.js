// more on Gastby-ssr: https://www.gatsbyjs.com/docs/api-files-gatsby-ssr/

import React from 'react';
import Layout from './src/components/Layout';

export function wrapPageElement({ element, props }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Layout {...props}> {element} </Layout>;
}
