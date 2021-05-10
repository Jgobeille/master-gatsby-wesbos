import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';
import SEO from '../components/SEO';

const SlicemasterStyles = styled.div`
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 6rem;
    margin-top: -2rem;
    position: relative;
    z-index: 2;
  }

  .description {
    text-align: center;
  }
`;

const SingleSlicemaster = ({ data }) => {
  const { person } = data;
  return (
    <>
      <SEO title={person.name} image={person.image.asset.src} />
      <SlicemasterStyles>
        <Image fluid={person.image.asset.fluid} alt={person.name} />
        <h2>
          <span className="mark">{person.name}</span>
        </h2>
        <p className="description">{person.description}</p>
      </SlicemasterStyles>
    </>
  );
};

export const query = graphql`
  query($slug: String!) {
    person: sanityPerson(slug: { current: { eq: $slug } }) {
      description
      id
      name
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;

export default SingleSlicemaster;
