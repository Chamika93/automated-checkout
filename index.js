const { getNumOfDealsEligible, getProductDeal }  = require('./helpers/dealHelpers');
const { getProduct } = require('./helpers/productHelpers');
const { orderCompareFn } = require('./helpers/sortingHelper');

const products = require('./products.json');
const deals = require('./deals.json');
const order = require('./order.json');


const modifiedOrder = order.map(orderItem => {
    const deal = getProductDeal(deals, orderItem.name);
    const product = getProduct(products, orderItem.name);
    return {...orderItem, deal, product  }
})

modifiedOrder.sort(orderCompareFn['DEAL_DESCENDING'])

const orderPrices = modifiedOrder.map(({quantity: orderQuantity, deal, product})=> {

    const productPrice =  product.price;

    const numOfDealsEligible = deal && getNumOfDealsEligible(products, deal, order);
    
    if(Boolean(numOfDealsEligible)) {
        return numOfDealsEligible < orderQuantity ? 
            ( deal.dealPrice * numOfDealsEligible ) + ( productPrice * (orderQuantity - numOfDealsEligible ))
            : deal.dealPrice * orderQuantity;
                                        
    }

    return productPrice * orderQuantity;
});

console.log('------------- Your Receipt --------------')
for (let i = 0; i < order.length; i++) {
    console.log(`${order[i].name}           £${orderPrices[i]}`)
}





