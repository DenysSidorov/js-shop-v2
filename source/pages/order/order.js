// import slick from '../../components/slick/slick'
import './order.scss';
import OrderPage from '../../components/pages/order';


import React from 'react';
import ReactDom from 'react-dom';

document.addEventListener("DOMContentLoaded", function (event) {
  const container = document.getElementById('reactContent');
  if (container) {
    ReactDom.render(<OrderPage/>, container);
  }
});