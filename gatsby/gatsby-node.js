import path from 'path';

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

const createPages = async (params) => {
  // create pages dynamically
  // 1.) Pizzas
  await turnPizzasIntoPages(params);
  // 2.)Toppings
  // 3.) Slicemaster
};

module.exports = {
  createPages,
};
