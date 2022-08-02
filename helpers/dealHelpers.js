const { getType } = require('./productHelpers');

const hasDeal = (products, deal, order) => {
    if(deal.buyProduct) {
        if(typeof deal.buyProduct === "string" ) {
            return order.find(({product}) => product===deal.buyProduct)?.quantity === deal.quantity;
        }
        return deal.buyProduct.every((item) => !!order.find(({product}) => item===product));
    }
    if(deal.buyType) {
        return order.
                    filter(({product}) => getType(products, product)===deal.buyType)
                    .map(({quantity}) => quantity)
                    .reduce((a, b) => a + b, 0) === deal.quantity;
    }
}

module.exports = {
    hasDeal,
}