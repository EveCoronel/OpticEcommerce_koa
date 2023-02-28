const envConfig = require("../config/env.config");
const { getDAOS } = require("../models/dao/daos.factory");

class ProductsApi {
  constructor() {
    this.productsDao = getDAOS(envConfig.DATASOURCE).productsDao;
  }

  async getProducts(category = null) {
    if (!category) return this.productsDao.getAll();
    let filter = { category: category };
    return this.productsDao.getAll(filter);
  }
  async getProductById(_id) {
    return this.productsDao.getById(_id);
  }
  async createProduct(productPayload) {
    let createdProduct = await this.productsDao.save(productPayload);
    return createdProduct;
  }
  async updateProduct(_id, productPayload) {
    return this.productsDao.update(_id, productPayload);
  }
  async deleteProduct(_id) {
    return this.productsDao.delete(_id);
  }
}

module.exports = ProductsApi;
