const getType = (products, product) => {
    return products.find(({name}) => name === product)?.type;
}

const getProductPrice = (products, pName) => {
    return products.find(({name}) => name === pName)?.price;
}

module.exports = {
    getType,
    getProductPrice,
}