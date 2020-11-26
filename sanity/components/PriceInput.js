/* eslint-disable react/prop-types */
import React from 'react';

import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

// adds or removes values in Sanity client if number is available or not
const createPatchFrom = (value) =>
  PatchEvent.from(value === '' ? unset() : set(Number(value)));

// Number formatter - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
const formatMoney = Intl.NumberFormat('en', {
  style: 'currency',
  currency: 'USD',
}).format;

const PriceInput = ({ type, value, onChange, inputComponent }) => (
  <div>
    <h2>
      {type.title} - {value ? formatMoney(value / 100) : ''}
    </h2>
    <p>{type.description}</p>
    <input
      type={type.name}
      value={value}
      onChange={(event) => onChange(createPatchFrom(event.target.value))}
      // references inputComponent so data can be handled when entered into input
      ref={inputComponent}
    />
  </div>
);

// Exposes Sanity CMS to have allow focus onto input
// accessability reasons
PriceInput.focus = function () {
  this._inputElement.focus();
};

export default PriceInput;
