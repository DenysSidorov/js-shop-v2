import React from "react";
import axios from 'axios';
import {getGoodsArray, getGoodsIds} from '../../all-pages/cart-localdata';

// import MenuInfoSection from "../../modules/MenuInfoSection";
// import WaysDevPay from "./WaysDevPay";
import GoodsTable from "./GoodsTable";

class OrderPage extends React.Component {
  state = {
    cart: []
  };

  constructor(props) {
    super(props);
    this.initCadd = this.initCadd.bind(this);

  }

  componentWillReceiveProps() {
    console.log('componentWillReceiveProps');
  }

  async initCadd() {
    window.scrollTo(0, 0)
  }

  async componentWillMount() {
    try {
      let localCart = getGoodsArray();
      if(!localCart.length) return;
      let result = await axios({
        method: 'get',
        url: `http://localhost:5006/api/goods/goods-array?ids=${getGoodsIds()}`
      });;

      // взять и скрестить дынные с корзины и Localdata
      let newCart = result.data.map((el) => {
        let count = 0;
        localCart.forEach((cartEl) => {
          if (cartEl.id == el._id) {
            count = cartEl.count
          }
        });
        return {...el, count: count}
      })

      this.setState({
        cart: newCart
      });
      console.log('///////////', result);
    } catch (er) {
      console.log(er.response || er);
    }
  }

  componentDidMount() {
    this.initCadd();
  }

  updateFromLocal = (id) => {
    // let newCart  = this.state.cart.filter(el => el._id != id);

    this.setState({cart: newCart});
  }

  render() {
    var styles = {
      // display: 'flex',
      // flexWrap: 'wrap',
      // justifyContent: 'center',
      // flexDirection: 'column'
    };
    let goods = this.state.cart;
    console.log('**************', goods);

    return (

      <div style={styles}>
        {/*<MenuInfoSection/>*/}
        {!goods.length
          ? <div style={{padding: '30px'}}>
            <span style={{fontSize: '2rem'}}>Корзина пуста!</span>
          </div>
          : <div className="formOrderMain">
            <GoodsTable updateFromLocal={this.updateFromLocal} cart={this.state.cart}/>
            {/*<WaysDevPay goods={this.state.cart} />*/}
          </div>}

      </div>

    )
  }
}

export default OrderPage;
// const mapStateToProps = (state, ownProps) => {
//     return {
//         cart: state.cart.items
//     }
// }
// export default connect(mapStateToProps)(OrderPage);
