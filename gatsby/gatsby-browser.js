import React from 'react';
import Layout from './src/components/Layout';
import { OrderProvider } from './src/components/OrderContext';

export function wrapPageElement({ element, props }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Layout {...props}> {element} </Layout>;
}

// Wraps top of Gatsby with new context so data can be shared from the highest point of the app
export function wrapRootElement({ element }) {
  return <OrderProvider>{element}</OrderProvider>;
}
