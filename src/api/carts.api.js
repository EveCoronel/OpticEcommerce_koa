const envConfig = require("../config/env.config");
const { HTTP_STATUS } = require("../constants/api.constants");
const { getDAOS } = require("../models/dao/daos.factory");
const CartDTO = require("../models/dtos/carts.dto");
const { HttpError } = require("../utils/utils");

class CartsApi {
  constructor() {
    this.CartsDao = getDAOS(envConfig.DATASOURCE).cartsDao;
  }

  async getAll() {
    return this.CartsDao.getAll();
  }

  async getById(_id) {
    if (!_id) {
      throw new HttpError(HTTP_STATUS.BAD_REQUEST, `id must be provided it`);
    }
    return this.CartsDao.getById(_id);
  }

  async createCart() {
    let cartPayload = new CartDTO();
    return this.CartsDao.createCart(cartPayload);
  }

  async addProduct(_id, idProd) {
    if (!_id)
      throw new HttpError(HTTP_STATUS.BAD_REQUEST, `id must be provided it`);
    if (!idProd)
      throw new HttpError(
        HTTP_STATUS.BAD_REQUEST,
        `id of product to add must be provided it`
      );

    return this.CartsDao.addProduct(_id, idProd);
  }

  async emptyCart(_id) {
    if (!_id)
      throw new HttpError(HTTP_STATUS.BAD_REQUEST, `id must be provided it`);
    return this.CartsDao.emptyCart(_id);
  }

  async getProductsInCart(_id) {
    if (!_id) {
      throw new HttpError(HTTP_STATUS.BAD_REQUEST, `id must be provided it`);
    }
    return this.CartsDao.getProductsInCart(_id);
  }
  async deleteProductById(_id, idProd) {
    if (!_id) {
      throw new HttpError(HTTP_STATUS.BAD_REQUEST, `id must be provided it`);
    }
    if (!idProd) {
      throw new HttpError(
        HTTP_STATUS.BAD_REQUEST,
        `id of product to add must be provided it`
      );
    }
    return this.CartsDao.deleteProductById(_id, idProd);
  }
}

module.exports = CartsApi;
