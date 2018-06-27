import localdata from '../libs/localdata';


export const getGoodsArray = () => {
  if (!localdata.isEmptyStorage('cart')) {
    try {
      let cart = localdata.getLocalData('cart');
      cart = JSON.parse(cart);
      return cart;
    }
    catch (er) {
      console.error(er);
    }
  }
  return []
}
export const getGoodsIds = () => {
  if (!localdata.isEmptyStorage('cart')) {
    try {
      let cart = localdata.getLocalData('cart');
      cart = JSON.parse(cart);
      let ids = cart.map((el) => el.id);
      console.log(ids, '///////');
      return ids;
    }
    catch (er) {
      console.error(er);
    }
  } else return [];
}
export const deleteGoodsById = (id) => {
  if (!localdata.isEmptyStorage('cart')) {
    try {
      let cart = localdata.getLocalData('cart');
      cart = JSON.parse(cart);
      let newCart = cart.filter((el) => el.id !== id);
      localdata.setLocalData('cart', JSON.stringify(newCart));
      _changeHTMLIco('?');
    }
    catch (er) {
      console.error(er);
      // localdata.deleteLocalData('cart');
    }
  } else return [];
}
export const incrementGoodsById = (id) => {
  if (!localdata.isEmptyStorage('cart')) {
    try {
      let cart = localdata.getLocalData('cart');
      cart = JSON.parse(cart);


      let flagExisting = false;
      let newCart = cart.map((el) => {
        if (el.id == id) {
          flagExisting = true;
          return {...el, count: el.count + 1}
        } else {
          return el
        }
      });

      if(!flagExisting){
        newCart.push({id, count: 1});
      }


      localdata.setLocalData('cart', JSON.stringify(newCart));
      _changeHTMLIco('+');
    }
    catch (er) {
      console.error(er);
      // localdata.deleteLocalData('cart');
    }
  } else return [];
}
export const decrementGoodsById = (id) => {
  if (!localdata.isEmptyStorage('cart')) {
    try {
      let cart = localdata.getLocalData('cart');
      cart = JSON.parse(cart);
      let newCart = cart.map((el) => {
        if (el.id == id) {
          if (el.count > 1) {
            return {...el, count: el.count - 1}
          } else {
            return el
          }
        } else {
          return el
        }
      });
      localdata.setLocalData('cart', JSON.stringify(newCart));
      _changeHTMLIco('-');
    }
    catch (er) {
      console.error(er);
      // localdata.deleteLocalData('cart');
    }
  } else return [];
}

const _changeHTMLIco = (value) => {
  let orderIco = document.getElementById('main-cart__ico');
  let currentOrders = orderIco.getAttribute('data-js_count');
  if (['+', '-', '0', '?'].indexOf(value) === -1) {
    return;
  }
  if (value === '+') {
    orderIco.setAttribute('data-js_count', Number(currentOrders, 10) + 1);
  } else if (value === '-') {
    orderIco.setAttribute('data-js_count', Number(currentOrders, 10) - 1);
  } else if (value === '0'){
    orderIco.setAttribute('data-js_count', 0);
  } else if (value === '?'){
    let cart = localdata.getLocalData('cart');
    cart = JSON.parse(cart);
    const count = cart.reduce((prev, cur) => {
      return prev + cur.count
    }, 0)
    orderIco.setAttribute('data-js_count', count);
  }
}

export const cleanAll = () => {
  localdata.setLocalData('cart', JSON.stringify([]));
  _changeHTMLIco('0');
}