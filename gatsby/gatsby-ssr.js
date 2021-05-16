// more on Gastby-ssr: https://www.gatsbyjs.com/docs/api-files-gatsby-ssr/

import React from 'react';
import Layout from './src/components/Layout';
import { OrderProvider } from './src/components/OrderContext';

// this function wraps all pages with a Layout component, therefore it does not need to be included in all files
export function wrapPageElement({ element, props }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Layout {...props}> {element} </Layout>;
}

// Wraps top of Gatsby with new context so data can be shared from the highest point of the app
export function wrapRootElement({ element }) {
  return <OrderProvider>{element}</OrderProvider>;
}
