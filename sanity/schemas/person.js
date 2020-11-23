import { MdPerson as icon } from 'react-icons/md';

export default {
  // computer name
  name: 'person',
  // visible title
  title: 'Slicemasters',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
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
      name: 'description',
      title: 'description',
      type: 'text',
      description: 'Tell us a bit about the person',
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
  ],
};
