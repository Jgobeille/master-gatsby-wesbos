import { FaPepperHot as icon } from 'react-icons/fa';

export default {
  // computer name
  name: 'topping',
  // visible title
  title: 'Toppings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Topping Name',
      type: 'string',
      description: 'what is the name of the topping?',
    },
    {
      name: 'vegetarian',
      title: 'vegetarian',
      type: 'boolean',
      description: 'what is the name of the topping?',
      options: {
        layout: 'checkbox',
      },
    },
  ],
  // Shows a preview of created options on page
  preview: {
    select: {
      name: 'name',
      vegetarian: 'vegetarian',
    },
    // Needed for options to appear on page
    prepare: ({ name, vegetarian }) => ({
      title: `${name} ${vegetarian ? '🌱' : ''}`,
    }),
  },
};
