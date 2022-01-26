import React from 'react';
import PropTypes from 'prop-types';

const Dateconverter = (dates) => {
  const date = new Date(dates);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const hour = date.getHours() % 12 || 12;
  const minute = date.getMinutes();
  const fullday = `${month}/${day}/${year} ${hour}:${minute}`;
  return fullday;
};
export default Dateconverter;
