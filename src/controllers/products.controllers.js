const ProductsApi = require("../api/products.api");
const { HTTP_STATUS } = require("../constants/api.constants");
const { successResponse, errorResponse } = require("../utils/utils");

const api = new ProductsApi();

class ProductsController {
  async getProducts(ctx) {
    let products = await api.getProducts();
    let response = successResponse(products, HTTP_STATUS.OK);
    ctx.body = response;
  }

  async getProductById(ctx) {
    const id = ctx.params._id;
    let response = {};
    if (!id || !id.length) {
      response = errorResponse(
        `Id must be provied it`,
        HTTP_STATUS.BAD_REQUEST
      );
      ctx.body = response;
      return;
    }
    let product = await api.getProductById(id);
    if (!product) {
      response = errorResponse(
        `Resource with ${id} does not exist in our records`,
        HTTP_STATUS.NOT_FOUND
      );
      ctx.body = response;
      return;
    }
    response = successResponse(product, HTTP_STATUS.OK);
    ctx.body = response;
  }

  async saveProduct(ctx) {
    let productPayload = ctx.request.body;
    let response = {};
    if (!productPayload) {
      response = errorResponse("Body must be provied", HTTP_STATUS.BAD_REQUEST);
      return;
    }
    let productAdded = await api.createProduct(productPayload);
    ctx.body = successResponse(productAdded, HTTP_STATUS.CREATED);
  }

  async updateProduct(ctx) {}

  async deleteProduct(ctx) {}

  async getProductsByCategory(ctx) {}
}

module.exports = new ProductsController();
