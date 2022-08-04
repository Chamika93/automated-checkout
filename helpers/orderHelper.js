
const getOrderItem = (order, item) => {
    return order.find(({name}) => name===item)
}


module.exports = {
    getOrderItem,
}