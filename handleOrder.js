const { getNumOfDealsEligible }  = require('./helpers/dealHelpers');

const products = require('./products.json');

const getOrderPrices = modifiedOrder => {
    return modifiedOrder.map(({quantity: orderQuantity, deal, product})=> {

        const productPrice =  product.price;
    
        const numOfDealsEligible = deal && getNumOfDealsEligible(products, deal, modifiedOrder);
        
        if(Boolean(numOfDealsEligible)) {
            return numOfDealsEligible < orderQuantity ? 
                ( deal.dealPrice * numOfDealsEligible ) + ( productPrice * (orderQuantity - numOfDealsEligible ))
                : deal.dealPrice * orderQuantity;
                                            
        }
    
        return productPrice * orderQuantity;
    });
}

module.exports = {
    getOrderPrices,
}
