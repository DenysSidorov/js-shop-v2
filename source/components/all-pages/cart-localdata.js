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


      let newCart = cart.map((el) => {
        if (el.id == id) {
          return {...el, count: el.count + 1}
        } else {
          return el
        }
      });


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
  if (['+', '-'].indexOf(value) === -1) {
    return;
  }
  if (value === '+') {
    orderIco.setAttribute('data-js_count', Number(currentOrders, 10) + 1);
  } else if (value === '-') {
    orderIco.setAttribute('data-js_count', Number(currentOrders, 10) - 1);
  }
}


export const addGoodById = (id) => {
  if (!localdata.isEmptyStorage('cart')) {
    try {
      let cart = localdata.getLocalData('cart');
      cart = JSON.parse(cart);

      const count = cart.reduce((prev, cur) => {
        return prev + cur.count
      }, 0)

      let orderIco = document.getElementById('main-cart__ico');
      orderIco.setAttribute('data-js_count', count);
    } catch (er) {
      console.error(er);
    }
  }
};

function test() {
  if (localdata.isEmptyStorage('cart')) {

  } else {
    try {
      let cart = localdata.getLocalData('cart');
      cart = JSON.parse(cart);
      const count = cart.reduce((prev, cur) => {
        return prev + cur.count
      }, 0)

      let orderIco = document.getElementById('main-cart__ico');
      orderIco.setAttribute('data-js_count', count);
    } catch (er) {
      console.error(er);
    }
  }
}

export const cleanAll = () => {
  localdata.setLocalData('cart', JSON.stringify([]));
}