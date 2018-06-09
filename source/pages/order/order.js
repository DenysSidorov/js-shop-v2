// import slick from '../../components/slick/slick'
import './order.scss';
// import './jop.less';
// import 'normalize.css';

// import createMenu from '../../components/menu/menu';
// var menu = createMenu(['Главная!/*','Блог'], 'menu');
// document.body.appendChild(menu);

// console.log('in order2.js');
// console.log($);
// console.log(jQuery);

import React from 'react';
import ReactDom from 'react-dom';

document.addEventListener("DOMContentLoaded", function (event) {
  const container = document.getElementById('reactContent');
  if (container) {
    ReactDom.render(<App/>, container);
  }
});

const App = (props) => {
  return (
    <h1 className='red' >Hello React</h1>
  )
}