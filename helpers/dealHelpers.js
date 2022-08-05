const { getType } = require('./productHelpers');
const { getOrderItem } = require('./orderHelper');



const getProductDeal = (deals, item) => deals.find(({product}) => product===item );

// product deal - deal apllies if you buy one or more item of a certain product or prodcuts
//                ex: Banana - £0.75 if you buy 2 apples
//                    Deluxe dessert for 2 - £3.00 if you buy wine and a deluxe meal for 2

const getNumOfProductDeal = (deal, order) => {
    if(deal.isSameProduct) {
        const orderItem = getOrderItem(order, deal.product);
        return orderItem.quantity < deal.quantity ? 0 : orderItem.quantity;
    }

    const hasProductDeal = deal.buyProduct.every((item) => {
        const requiredOrderItem = getOrderItem(order, item);
        if(!requiredOrderItem || requiredOrderItem.quantity < deal.quantity) {
            return false;
        }
        return true;
    
    });
    if(!hasProductDeal) {
        return 0;
    }
    return Math.min(...deal.buyProduct.map((item) => getOrderItem(order, item).quantity / deal.quantity));
}

// Type deal - deal apllies if you buy one or more item of a certain product type
//                ex: Strawberries £1.50 if you buy any type of Dairy

const getNumOfTypeDeal = ( deal, order, products) => {
    const totalItemsofType =  order
                                .filter(({name}) => getType(products, name)===deal.buyType)
                                .map(({quantity}) => quantity)
                                .reduce((a, b) => a + b, 0);
    
    return totalItemsofType / deal.quantity;
}

const getNumOfDealsEligible = (products, deal, order) => {
    if(deal.buyProduct) {
        return Math.floor(getNumOfProductDeal(deal, order))
    }
    
    return Math.floor(getNumOfTypeDeal(deal, order, products))
}

module.exports = {
    getNumOfDealsEligible,
    getProductDeal,
}