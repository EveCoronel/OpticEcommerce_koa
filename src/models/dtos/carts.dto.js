class CartDTO {
  constructor() {
    this.timestrap = Date.now();
    this.products = [];
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = CartDTO;
