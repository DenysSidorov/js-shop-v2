import React from "react";
import axios from 'axios';

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

    componentWillReceiveProps(){
        console.log('componentWillReceiveProps');
    }

    async initCadd() {
        window.scrollTo(0, 0)
    }

    componentWillMount = async() => {
        let id = '5a142275bc077735607fec53';
        try {
          let result = await axios.get(`http://localhost:5006/api/goods/${id}`);
          this.setState({cart: result.data})
          console.log('///////////',result);
        } catch (er) {
          console.log(er.response || er);
        }
    }

    componentDidMount() {
        this.initCadd();
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
                      <GoodsTable cart={this.state.cart}/>
                    {/*<WaysDevPay goods={this.state.cart} />*/}
                  </div> }

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
