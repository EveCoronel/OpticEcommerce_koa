const MongoRepository = require("../../Repository/mongo.repository");
const cartSchema = require("../../schemas/Cart.schema");
const { HTTP_STATUS } = require("../../../constants/api.constants");
const { HttpError } = require("../../../utils/utils");
//const { getDAOS } = require("../daos.factory");
//const envConfig = require("../../../config/env.config");
//const productsDaoMongo = getDAOS(envConfig.DATASOURCE).productsDao;
const productsDaoMongo = require("../products/productsDao.mongo")
const collection = "carts";

class DaoCartsMongo extends MongoRepository {
  constructor() {
    super(collection, cartSchema);
  }

  async createCart(cartPayload) {
    const newDocument = new this.model(cartPayload);
    return await newDocument.save();
  }

  async getProductsInCart(_id) {
    const document = await this.model.findOne({ _id: _id }, { __v: 0 });
    if (!document) {
      const message = `Resource with id ${_id} does not exist in our records`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    let productsIds = document.products;
    let products = [];
    for (const productId of productsIds) {
      let foundProduct = await productsDaoMongo.getById(productId.toString());
      if (foundProduct) {
        products.push(foundProduct);
      }
    }
    return products;
  }

  async addProduct(_id, idProd) {
    const updatedDocument = await this.model.updateOne(
      { _id: _id },
      { $push: { products: idProd } }
    );
    if (!updatedDocument.matchedCount) {
      const message = `Resource with id ${_id} does not exist in our records`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    return updatedDocument;
  }

  async deleteProductById(_id, idProd) {
    const updatedDocument = await this.model.updateOne(
      { _id: _id },
      { $pull: { products: idProd } }
    );
    if (!updatedDocument.matchedCount) {
      const message = `Resource with id ${_id} does not exist in our records`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    return updatedDocument;
  }

  async emptyCart(_id) {
    const updatedCart = await this.model.updateOne(
      { _id: _id },
      { products: [] }
    );
    if (!updatedCart.matchedCount) {
      const message = `Resource with id ${_id} does not exist in our records`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    return updatedCart;
  }
}

module.exports = new DaoCartsMongo();
