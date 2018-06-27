import './react_bla.scss';
import {incrementGoodsById} from '../../components/all-pages/cart-localdata';

// add good to cart
document.addEventListener('click', (ev)=>{
  const event = ev.target;
  let elId = event.getAttribute('id');
  let goodId = event.getAttribute('data-good-id');
  if(goodId !== undefined && elId === 'js_index_cart'){
    incrementGoodsById(goodId);
  }
});