import React from "react";
// import { connect } from 'react-redux';
// import {Link} from 'react-router-dom';
import st from './index.less'
import {deleteGoodsById, incrementGoodsById, decrementGoodsById} from '../../all-pages/cart-localdata';
// import { bindActionCreators } from 'redux';
// import {pushToCart, deleteFromCart, incrementItem, decrementItem} from '../../../../reducers/cart';
import AllPrice from './AllPrice';

class GoodsTable extends React.Component {
  state = {};

  componentDidMount() {
  }

  deleteItem = (el) => {
    let id = el._id;
    deleteGoodsById(id);
    this.props.deleteGoodByIdState(id);
  }

  incrementItem = (id) => {
    incrementGoodsById(id);
    this.props.incrementGoodByIdState(id);
  }

  decrementItem = (id) => {
    decrementGoodsById(id);
    this.props.decrementGoodByIdState(id);
  }

  render() {
    let goods = this.props.cart;

    return (
      <div className="itemsInCart">
        <div className="tableWrapperInOrder">
          <table className="tableWrapperInOrdertable__table">
            <thead>
            <tr>
              <th>Фото</th>
              <th>Наимен.</th>
              <th>Кол-во</th>
              <th>Цена</th>
              <th>Уд.</th>
            </tr>
            </thead>
            <tbody>
            {goods.map(el => {
              return <tr key={el._id}>
                <td data-label="Фото"><img className="imgINOrderTable"
                                           src={`/img-static/${el.photo[0]}`}
                                           alt=""/></td>
                <td data-label="Описание">
                  <a href={`/products/${el._id}`}
                     className="linkFromCartToItem">{el.name} {el.model}</a>
                </td>
                <td data-label="Кол-во">
                  <div className="countCartInTableContainer">
                    <button onClick={() => {
                      this.props.decrementItem(el._id)
                    }}
                            className="countCartInTableContainer__countMinus">-
                    </button>
                    <input readOnly value={el.count}
                           className="countCartInTableContainer__count"></input>
                    <button onClick={() => {
                      this.incrementItem(el._id)
                    }}
                            className="countCartInTableContainer__countPlus">+
                    </button>
                  </div>
                </td>
                <td data-label="Цена">
                  <span>{el.price}</span><span>грн.
                  {el.sail ? <span className="sailInfoInMainCart">-{el.sail}%</span> : null}
                                    </span>
                </td>
                <td onClick={() => {
                  if (confirm(`Вы уверены что хотите удалить товар: ${el.name} ${el.model}`)) {
                    this.deleteItem(el)
                  }
                }} data-label="Удалить"><span className="deleteCross">X</span></td>
              </tr>
            })}
            </tbody>
          </table>
        </div>
        <AllPrice cart={goods}/>


      </div>
    )

  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    cart: state.cart.items
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    deleteItem: (item) => deleteFromCart(item),
    addItem: (item) => pushToCart(item),
    incrementItem,
    decrementItem
  }, dispatch)
}

// export default connect(mapStateToProps, mapDispatchToProps)(GoodsTable);
export default GoodsTable;