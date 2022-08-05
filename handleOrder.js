const { getNumOfDealsEligible }  = require('./helpers/dealHelpers');

// return [orderPrice, saved value] array for each item
const products = require('./products.json');

const getOrderPrices = modifiedOrder => {
    return modifiedOrder.map(({quantity: orderQuantity, deal, product})=> {

        const productPrice =  product.price;
    
        const numOfDealsEligible = deal && getNumOfDealsEligible(products, deal, modifiedOrder);
     
        if(Boolean(numOfDealsEligible)) {
            return numOfDealsEligible > orderQuantity ? 
                [deal.dealPrice * orderQuantity,( productPrice - deal.dealPrice ) * orderQuantity ]
                :  [( deal.dealPrice * numOfDealsEligible ) + ( productPrice * (orderQuantity - numOfDealsEligible )), ( ( productPrice - deal.dealPrice ) * numOfDealsEligible )  ]
                                            
        }
    
        return [productPrice * orderQuantity, 0];
    });
}

module.exports = {
    getOrderPrices,
}
