const getType = (products, product) => {
    return products.find(({name}) => name === product)?.type;
}

const getProductPrice = (products, pName) => {
    return products.find(({name}) => name === pName)?.price;
}

const getProduct = (products, pName) => {
    return products.find(({name}) => name === pName);
}

module.exports = {
    getType,
    getProductPrice,
    getProduct,
}