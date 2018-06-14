import localdata from '../libs/localdata';

// [{id: "1a", count: 3}, {id: "2b", count: 18}]
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
