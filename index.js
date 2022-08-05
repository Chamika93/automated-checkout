const { getProductDeal }  = require('./helpers/dealHelpers');
const { getProduct } = require('./helpers/productHelpers');
const { orderCompareFn } = require('./helpers/sortingHelper');
const { getOrderPrices } = require('./handleOrder');

const products = require('./products.json');
const deals = require('./deals.json');
const orders = require('./orders.json');


for (let i = 0; i < orders.length; i++) {

    console.log(`order id ${ orders[i].id}`);

    const order = orders[i].orders;

    // validate the order
    if(order.some(({name}) => !getProduct(products, name))) { 
        console.log('Some items in the order is not available');
        console.log(`\n`);
        continue; 
    }

    const modifiedOrder = order.map(orderItem => {
        const deal = getProductDeal(deals, orderItem.name);
        const product = getProduct(products, orderItem.name);
        return {...orderItem, deal, product  }
    })

    modifiedOrder.sort(orderCompareFn[orders[i].receipt]);
    const orderPrices = getOrderPrices(modifiedOrder);

    console.log('------------- Your Receipt --------------')
    for (let i = 0; i < order.length; i++) {
        console.log(`${order[i].name}           £${orderPrices[i]}`)
    }
    console.log('------------------');
    console.log(`Total          £${orderPrices.reduce((a, b) => a + b, 0)}`);
    console.log(`\n`);
}