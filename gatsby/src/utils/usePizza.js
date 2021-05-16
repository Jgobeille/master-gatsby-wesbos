import React, { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';

const usePizza = ({ pizza, inputs }) => {
  // 1. create some state to hold our order
  // const [order, setOrder] = useState([]);
  // 2. make a function add things to order

  const [order, setOrder] = useContext(OrderContext);
  const addToOrder = (orderedPizza) => {
    setOrder([...order, orderedPizza]);
  };
  // 3. make a function remove things from order
  const removeFromOrder = (index) => {
    setOrder([
      // Everything before the item we want to remove
      ...order.slice(0, index),
      // Everything after the item we want to remove
      ...order.slice(index + 1),
    ]);
  };
  // 4. send this data the serverless when they check out
  // TODO

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
};

export default usePizza;
