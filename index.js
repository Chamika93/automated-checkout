const { getNumOfDealsEligible, getProductDeal }  = require('./helpers/dealHelpers');
const { getProductPrice, getProduct } = require('./helpers/productHelpers');

const products = require('./products.json');
const deals = require('./deals.json');
const order = require('./order.json');

// do the ordering
const compareFn = (field, ascending) => (a, b) => {
    console.log(a.name);
    if (a[field] < b[field]) {
        return ascending ? -1 : 1;
    }
    if (a[field] > b[field]) {
        return ascending ? 1 : -1;
    }
    return 0;
}


const modifiedOrder = order.map(orderItem => {
    const deal = getProductDeal(deals, orderItem.name);
    const product = getProduct(products, orderItem.name);
    return {...orderItem, deal, product  }
})

console.log(modifyOrder);

// console.log(order.sort(compareFn('ty', false)));

const orderPrices = order.map(({name: orderItem, quantity: orderQuantity})=> {

    const productPrice =  getProductPrice(products, orderItem);

    const deal = getProductDeal(deals, orderItem);
    const numOfDealsEligible = deal && getNumOfDealsEligible(products, deal, order);
    
    if(Boolean(numOfDealsEligible)) {
        return numOfDealsEligible < orderQuantity ? 
            ( deal.dealPrice * numOfDealsEligible ) + ( productPrice * (orderQuantity - numOfDealsEligible ))
            : deal.dealPrice * orderQuantity;
                                        
    }

    return productPrice * orderQuantity;
});

console.log(orderPrices);




