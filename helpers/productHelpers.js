const getType = (products, product) => {
    return products.find(({name}) => name === product)?.type;
}

const getPrice = (products, pName) => {
    return products.find(({name}) => name === pName)?.price;
}

module.exports = {
    getType,
    getPrice,
}