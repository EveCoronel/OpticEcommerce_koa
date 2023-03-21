const envConfig = require("../config/env.config");
const { HTTP_STATUS } = require("../constants/api.constants");
const { getDAOS } = require("../models/dao/daos.factory");
const CartDTO = require("../models/dtos/carts.dto");
const OrderDto = require("../models/dtos/order.dto");
const { HttpError } = require("../utils/utils");
const sendMail = require("../utils/sendMail");

class CartsApi {
  constructor() {
    this.CartsDao = getDAOS(envConfig.DATASOURCE).cartsDao;
    this.OrderDao = getDAOS(envConfig.DATASOURCE).ordersDao;
    this.UserDao = getDAOS(envConfig.DATASOURCE).usersDao
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

  async createOrder(username) {
    try {
      let user = await this.UserDao.getByEmail(username)
      let products = await this.CartsDao.getProductsInCart(user.cart);
      let orders = await this.OrderDao.getAll();
      let orderNumber = orders.length + 1;
      let orderPayload = new OrderDto(products, orderNumber, "generated", username)
      let response = await this.OrderDao.save(orderPayload)
      sendMail(envConfig.ADMIN_EMAIL, "New order", "New order was created")
      return response;
    } catch (error) {
      throw new HttpError(
        HTTP_STATUS.INTERNAL_ERROR,
        `Order could not be created successfully`
      );
    }
  }
}

module.exports = CartsApi;
