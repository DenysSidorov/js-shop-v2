import localdata from '../libs/localdata';


// initial state for cart's ico (all goods)
if(localdata.isEmptyStorage('cart')){

} else {
  try {
    let cart = localdata.getLocalData('cart');
    cart = JSON.parse(cart);
    const count = cart.reduce((prev, cur) => {
      return prev + cur.count
    }, 0)

    let orderIco = document.getElementById('main-cart__ico');
    orderIco.setAttribute('data-js_count', count);
  } catch (er){
    console.error(er);
  }
}