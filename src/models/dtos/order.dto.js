class OrderDto {
    constructor(products, orderNumber, state = "generated", email) {
        this.products = products;
        this.orderNumber = orderNumber;
        this.state = state;
        this.email = email;
        this.createdAt = new Date().toISOString();
    }


}
module.exports = OrderDto;
