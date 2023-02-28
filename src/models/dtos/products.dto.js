class ProductDTO {
  constructor(productItem) {
    Object.assign(this, productItem);
    this.updatedAt = new Date();
  }
}
module.exports = ProductDTO;
