const { isEligibleForDeal, getItemDeal }  = require('./helpers/dealHelpers');
const { getProductPrice } = require('./helpers/productHelpers');

const products = require('./products.json');
const deals = require('./deals.json');
const order = require('./order.json');

// do the ordering


const orderPrices = order.map(({name: orderItem, quantity: orderQuantity})=> {
    
    const deal = getItemDeal(deals, orderItem);

    // get the number of deals
    if(deal && isEligibleForDeal(products, deal, order)) {
        return deal.dealPrice * orderQuantity
    }

    return getProductPrice(products, orderItem) * orderQuantity;
},0)

console.log(orderPrices);