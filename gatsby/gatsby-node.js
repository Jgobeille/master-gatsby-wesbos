import path from 'path';
import fetch from 'isomorphic-fetch';

// Docs on Node APIs: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/

/** ** ** 
Notes: 
1.) Since this page is all node processes, the functions need to be async so they 
can properly fetch data while running other processes


****** */
const turnPizzasIntoPages = async ({ graphql, actions }) => {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // 2. Query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // What is the URL for this new page??
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });

  // 3. Loop over each pizza and create a page for that pizza
};

const turnToppingsIntoPages = async ({ graphql, actions }) => {
  // 1. Get a template for this page
  const toppingsTemplate = path.resolve('./src/pages/pizzas.js');
  // 2. Query all pizzas
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);

  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      // What is the URL for this new page??
      path: `topping/${topping.name}`,
      component: toppingsTemplate,
      context: {
        topping: topping.name,
        regex: `/^${topping.name}$/i`,
      },
    });
  });
};

const fetchBeersAndTurnIntoNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  // fetch list of beers
  const res = await fetch('https://api.sampleapis.com/beers/ale');

  const beers = await res.json();

  // loop over each one
  for (const beer of beers) {
    // Every node entered in Gatsby needs to have specific metaData so it can be looked up
    const nodeMeta = {
      // if JSON data doesn't have an id, you can use this Gatsby function to make your own
      id: createNodeId(`beer-${beer.name}`),
      // if this node has a parent node, you can associate them here
      parent: null,
      // if this node has children nodes you can associate them here
      children: [],
      // additional meta data
      internal: {
        type: 'Beer',
        // specifies the type of media the JSON data is so other plugins can easily find it and source it
        mediaType: 'application/json',
        // look up docs for this
        contentDigest: createContentDigest(beer),
      },
    };
    // create a node for that beer
    actions.createNode({
      // spreads in all the data about beer and it's generated metaData
      ...beer,
      ...nodeMeta,
    });
  }
};

const turnSlicemastersIntoPages = async ({ graphql, actions }) => {
  // 1. Query all slicemasters
  const { data } = await graphql(`
    query {
      people: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);

  // 3. Figure out how many pages there are based on how many slicemasters there are and how many per page
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.people.totalCount / pageSize);
  // 4. Loop from 1 to n and create the pages for them
  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      // this data is passed to the template when we create it
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
};

const turnSingleSlicemasterIntoPage = async ({ graphql, actions }) => {
  // get template

  const slicemasterTemplate = path.resolve('./src/templates/Slicemaster.js');

  // query data to get each slicemaster
  const { data } = await graphql(`
    query {
      people: allSanityPerson {
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);

  data.people.nodes.forEach((person) => {
    actions.createPage({
      // What is the URL for this new page??
      path: `slicemaster/${person.slug.current}`,
      component: slicemasterTemplate,
      context: {
        slug: person.slug.current,
      },
    });
  });
};

const sourceNodes = async (params) => {
  // fetch a list of beers and source them into our Gatsby API
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
};
const createPages = async (params) => {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  // create pages dynamically
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
    turnSingleSlicemasterIntoPage(params),
  ]);
};

/**
 * Notes on sourcing external APIS
 *
 * Docs: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#sourceNodes
 * Sourcing Nodes
 * sourcing - Putting data into Gatsby API
 * Nodes - A piece of data that graphql can use
 *
 * When Gatsby uses nodejs to dynamically create data, this will run before the create pages action
 * This sequence happens at build time so it is not always querying large amounts of data every single time.
 */

module.exports = {
  createPages,
  sourceNodes,
};
