const { hasDeal }  = require('./helpers/dealHelpers');
const { getPrice } = require('./helpers/productHelpers');

const products = require('./products.json');
const deals = require('./deals.json');
const order = require('./order.json');

const total = order.reduce((totalBill, orderItem)=> {
    
    let orderItemDeal = deals.find(({product}) => product===orderItem.product );

    if(orderItemDeal && hasDeal(products, orderItemDeal, order)) {
        return totalBill + (orderItemDeal.dealPrice*orderItem.quantity)
    }

    return totalBill+ (getPrice(products, orderItem.product)*orderItem.quantity);
},0)

console.log(total);