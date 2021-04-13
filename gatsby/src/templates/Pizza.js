import { graphql } from 'gatsby';
import React from 'react';

const SinglePizzaPage = () => <p>Single Pizza!</p>;

// The slug var comes from Gatsby node context
// All pages have access to gatsby node content
export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      id
      name
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`;

export default SinglePizzaPage;
