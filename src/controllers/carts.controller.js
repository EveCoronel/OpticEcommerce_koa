const CartsApi = require("../api/carts.api");
const { HTTP_STATUS } = require("../constants/api.constants");
const { successResponse, HttpError } = require("../utils/utils");

const api = new CartsApi();

class CartsController {
  async getCarts(ctx) {
    try {
      const carts = await api.getAll();
      const response = successResponse(carts, HTTP_STATUS.OK);
      ctx.status = HTTP_STATUS.OK;
      ctx.body = response;
    } catch (error) {
      throw new HttpError(
        HTTP_STATUS.INTERNAL_ERROR,
        "Resources could not be found",
        error.message
      );
    }
  }

  async getCartById(ctx) {
    const { _id } = ctx.request.params;
    if (!_id) {
      throw new HttpError(HTTP_STATUS.BAD_REQUEST, `id must be provided it`);
    }
    try {
      const cart = await api.getById(_id);
      const response = successResponse(cart, HTTP_STATUS.OK);
      ctx.status = HTTP_STATUS.OK;
      ctx.body = response;
    } catch (error) {
      throw new HttpError(
        HTTP_STATUS.INTERNAL_ERROR,
        "Resource could not be found",
        error.message
      );
    }
  }

  async saveCart(ctx) {
    try {
      const newCart = await api.createCart();
      const response = successResponse(newCart, HTTP_STATUS.CREATED);
      ctx.status = HTTP_STATUS.CREATED;
      ctx.body = response;
    } catch (error) {
      throw new HttpError(
        HTTP_STATUS.INTERNAL_ERROR,
        "Resource could not be created",
        error.message
      );
    }
  }

  async updateCart(ctx) {
    const { _id, idProd } = ctx.request.params;
    if (!_id || !idProd) {
      throw new HttpError(
        HTTP_STATUS.BAD_REQUEST,
        `id and idProd must be provided it`
      );
    }
    try {
      const updateCart = await api.addProduct(_id, idProd);
      const response = successResponse(updateCart, HTTP_STATUS.OK);
      ctx.status = HTTP_STATUS.OK;
      ctx.body = response;
    } catch (error) {
      throw new HttpError(
        HTTP_STATUS.INTERNAL_ERROR,
        "Resource could not be updated",
        error.message
      );
    }
  }

  async emptyCart(ctx) {
    const { _id } = ctx.request.params;
    if (!_id) {
      throw new HttpError(HTTP_STATUS.BAD_REQUEST, `id must be provided it`);
    }
    try {
      const emptyCart = await api.emptyCart(_id);
      const response = successResponse(emptyCart, HTTP_STATUS.OK);
      ctx.status = HTTP_STATUS.OK;
      ctx.body = response;
    } catch (error) {
      throw new HttpError(
        HTTP_STATUS.INTERNAL_ERROR,
        "Resource could not be emptied",
        error.message
      );
    }
  }

  async getProductsInCart(ctx) {
    const { _id } = ctx.request.params;
    if (!_id) {
      throw new HttpError(HTTP_STATUS.BAD_REQUEST, `id must be provided it`);
    }
    try {
      const productsInCart = await api.getProductsInCart(_id);
      const response = successResponse(productsInCart, HTTP_STATUS.OK);
      ctx.status = HTTP_STATUS.OK;
      ctx.body = response;
    } catch (error) {
      throw new HttpError(
        HTTP_STATUS.INTERNAL_ERROR,
        "Resources could not be found",
        error.message
      );
    }
  }

  async deleteProductById(ctx) {
    const { _id, idProd } = ctx.request.params;
    if (!_id || !idProd) {
      throw new HttpError(
        HTTP_STATUS.BAD_REQUEST,
        `id and idProd must be provided it`
      );
    }
    try {
      const productsInCart = await api.deleteProductById(_id, idProd);
      const response = successResponse(productsInCart, HTTP_STATUS.OK);
      ctx.status = HTTP_STATUS.OK;
      ctx.body = response;
    } catch (error) {
      throw new HttpError(
        HTTP_STATUS.INTERNAL_ERROR,
        "Resource could not be deleted",
        error.message
      );
    }
  }
}

module.exports = new CartsController();
