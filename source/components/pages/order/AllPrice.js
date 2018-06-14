import React from "react";
class AllPrice extends React.Component {


    render() {
        let goods = this.props.cart;
        let price = goods.reduce((prev, cur)=> prev + Math.floor((((cur.price/100)*(100-cur.sail))*cur.count)), 0);
        return(
            <div className="allPriceForItems">
                <span className="allPriceForItems_text">ВСЕГО К ОПЛАТЕ:&nbsp;&nbsp;</span>
                <span className="allPriceForItems_price">{price}</span>
                <span className="allPriceForItems_text">&nbsp;грн.</span>
                    <div></div>
            </div>
        )
    }
}


export default AllPrice;