import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';

const PizzaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
`;

const SinglePizzaPage = ({ data }) => {
  const { pizza } = data;
  console.log(pizza);

  return (
    <PizzaGrid>
      <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
      <div>
        <h2 className="mark">{pizza.name}</h2>
        <ul>
          {pizza.toppings.map((topping) => (
            <li key={topping.id}>{topping.name}</li>
          ))}
        </ul>
      </div>
    </PizzaGrid>
  );
};

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
