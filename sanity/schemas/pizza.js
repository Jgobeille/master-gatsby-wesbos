import { MdLocalPizza as icon } from 'react-icons/md';
import PriceInput from '../components/PriceInput';

export default {
  // computer name
  name: 'pizza',
  // visible title
  title: 'Pizzas',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'name of the pizza',
    },
    {
      name: 'slug',
      title: 'slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'image',
      type: 'image',
      options: {
        // Hot spot is a feature in sanity that lets you highlight important info of image(cropping tool)
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'price',
      type: 'number',
      description: 'Price of the pizza in cents',
      validation: (Rule) => Rule.min(1000),
      inputComponent: PriceInput,
    },
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      // creates array referencing the toppings schema
      of: [{ type: 'reference', to: [{ type: 'topping' }] }],
    },
    {
      name: 'vegetarian',
      title: 'vegetarian',
      type: 'boolean',
      description: 'Is this pizza vegetarian?',
      options: {
        layout: 'checkbox',
      },
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      vegetarian: 'vegetarian',
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
      topping3: 'toppings.3.name',
    },
    prepare: ({ title, media, vegetarian, ...toppings }) => {
      const tops = Object.values(toppings).filter(Boolean);
      return {
        title: `${title} ${vegetarian ? '🌱' : ''}`,
        media,
        subtitle: tops.join(','),
      };
    },
  },
};
