/* eslint-disable jsx-a11y/label-has-associated-control */
import { graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import React from 'react';
import SEO from '../components/SEO';
import PizzaOrder from '../components/PizzaOrder';
import MenuItemStyles from '../styles/MenuItemStyles';
import OrderStyles from '../styles/OrderStyles';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import useForm from '../utils/useForm';
import usePizza from '../utils/usePizza';
import calculateOrderTotal from '../utils/calcuateOrderTotal';

const OrderPage = ({ data }) => {
  const pizzas = data.pizzas.nodes;

  const { values, updateValue } = useForm({
    name: '',
    email: '',
  });

  const { order, addToOrder, removeFromOrder } = usePizza({
    pizzas,
    inputs: values,
  });

  return (
    <>
      <SEO title="Order a pizza" />
      <p>Hey! I'm the order page</p>
      <OrderStyles>
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={updateValue}
          />
          <label htmlFor="email">email </label>
          <input
            type="text"
            name="email"
            value={values.email}
            onChange={updateValue}
          />
        </fieldset>
        <fieldset className="menu">
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <MenuItemStyles key={pizza.id}>
              <GatsbyImage
                width="50"
                height="50"
                fluid={pizza.image.asset.fluid}
              />
              <div>{pizza.name}</div>
              <div>
                {['S', 'M', 'L'].map((size, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() =>
                      addToOrder({
                        id: pizza.id,
                        size,
                      })
                    }
                  >
                    {' '}
                    {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset className="order">
          <legend>Order</legend>
          <PizzaOrder
            order={order}
            removeFromOrder={removeFromOrder}
            pizzas={pizzas}
          />
        </fieldset>
        <fieldset>
          <h3>
            Your total is {formatMoney(calculateOrderTotal(order, pizzas))}
          </h3>
          <button type="submit">Order Ahead</button>
        </fieldset>
      </OrderStyles>
    </>
  );
};

export default OrderPage;

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
