import { graphql } from 'gatsby';
import React from 'react';

const SingleSlicemaster = ({ data }) => {
  const { person } = data;
  return (
    <div>
      <p>{person.name}</p>
    </div>
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
          fluid(maxWidth: 400) {
            aspectRatio
            base64
            sizes
            src
            srcSet
            srcSetWebp
            srcWebp
          }
        }
      }
    }
  }
`;

export default SingleSlicemaster;
