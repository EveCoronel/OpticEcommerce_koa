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

    const productsIds = document.products;

    let productsIdsAux = Object.values(productsIds.reduce((acc, curr) => {
      acc[curr] = acc[curr] || { _id: curr, cant: 0 };
      acc[curr].cant++;
      return acc;
    }, {}));

    let productsInCart = [];
    for (const product of productsIdsAux) {
      let foundProduct = await productsDaoMongo.getById(product._id);
      if (foundProduct) {
        foundProduct.cant = product.cant
        productsInCart.push(foundProduct);
      }
    }
    return productsInCart
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
