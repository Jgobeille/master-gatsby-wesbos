import { MdLocalPizza as icon } from 'react-icons/md';

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
      // TODO: Add custom input component
    },
  ],
};
