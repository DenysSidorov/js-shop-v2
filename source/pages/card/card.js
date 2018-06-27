import './card.scss';
import {incrementGoodsById} from '../../components/all-pages/cart-localdata';

let toOrderBtn = document.getElementById('toOrderId');
toOrderBtn.addEventListener('click', (el) => {
  incrementGoodsById(toOrderBtn.dataset.id);
});