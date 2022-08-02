const { getType } = require('./productHelpers');
const { getOrderItem } = require('./orderHelper');

// there are 2 types of deals
// product deal - deal apllies if you buy one or more item of a certain product
//                ex: Banana, Fruit, £1.00, £0.75 if you buy 2 apples

// Type deal - deal apllies if you buy one or more item of a certain product type
//                ex: Strawberries, Fruit, £2.00, £1.50 if you buy any type of Dairy

const hasProductDeal = (deal, order) => {
    if(typeof deal.buyProduct === "string" ) {
        return getOrderItem(order, deal.buyProduct)?.quantity === deal.quantity;
    }
    return deal.buyProduct.every((item) => !!getOrderItem(order, item));
}

const hasTypeDeal = (products, deal, order) => {
    return order.
        filter(({name}) => getType(products, name)===deal.buyType)
        .map(({quantity}) => quantity)
        .reduce((a, b) => a + b, 0) === deal.quantity;
}

const isEligibleForDeal = (products, deal, order) => {
    if(deal.buyProduct) {
        return hasProductDeal(deal, order)
    }

    return hasTypeDeal(products, deal, order)
}

const getItemDeal = (deals, item) => deals.find(({product}) => product===item );

module.exports = {
    isEligibleForDeal,
    getItemDeal,
}