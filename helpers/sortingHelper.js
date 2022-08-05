const compareFn = (field1, field2, ascending) => (a, b) => {
    if (a[field1][field2] < b[field1][field2]) {
        return ascending ? -1 : 1;
    }
    if (a[field1][field2] > b[field1][field2]) {
        return ascending ? 1 : -1;
    }
    return 0;
}

const dealCompareFn = ascending => (a, b) => {
    const aPrice = a.deal ? a.deal.dealPrice : a.product.price;
    const bPrice = b.deal ? b.deal.dealPrice : b.product.price;

    if (aPrice < bPrice) {
        return ascending ? -1 : 1;
    }
    if (aPrice > bPrice) {
        return ascending ? 1 : -1;
    }
    return 0;
}

const orderCompareFn  = {
    'ALPHABETICAL_ASCENDING': compareFn('product', 'name' , true),
    'ALPHABETICAL_DESCENDING': compareFn('product', 'name' , false),
    'TYPE_ASCENDING': compareFn('product', 'type' , true),
    'TYPE_DESCENDING': compareFn('product', 'type' , false),
    'INDIVIDUAL_ASCENDING': compareFn('product', 'price' , true),
    'INDIVIDUAL_DESCENDING': compareFn('product', 'price' , false),
    'DEAL_ASCENDING': dealCompareFn(true),
    'DEAL_DESCENDING': dealCompareFn(false),
}

module.exports = {
    orderCompareFn,
}