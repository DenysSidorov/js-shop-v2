import './card.scss';
import localdata from '../../components/libs/localdata';

let orderIco = document.getElementById('main-cart__ico');
let toOrderBtn = document.getElementById('toOrderId');

toOrderBtn.addEventListener('click', (el) => {
  addToLocalId(toOrderBtn.dataset.id);

  let currentOrders = orderIco.getAttribute('data-js_count');
  orderIco.setAttribute('data-js_count', Number(currentOrders, 10) + 1);
})


// Добавить в локальное хранилище [{id, count}]
const addToLocalId = (id) => {
  try {
    let cart = localdata.getLocalData('cart');
    if (!cart) {
      localdata.setLocalData('cart', JSON.stringify([{id: id, count: 1}]));
    } else {
      cart = JSON.parse(cart);
      if (cart.some((el) => el.id === id)) {
        cart = cart.map((el) => {
          if (el.id == id) {
            return {id: el.id, count: el.count + 1}
          } else {
            return el
          }
        })
      } else {
        cart.push({id: id, count: 1})
      }

      localdata.setLocalData('cart', JSON.stringify(cart));
    }
    console.log(localdata.getLocalData('cart'));
  } catch (er){
    console.error(er);
  }
}
