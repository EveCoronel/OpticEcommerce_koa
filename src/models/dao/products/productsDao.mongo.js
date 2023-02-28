const MongoRepository = require("../../Repository/mongo.repository");
const productSchema = require("../../schemas/Product.schema");

const collection = "products";

class Products extends MongoRepository {
  constructor() {
    super(collection, productSchema);
  }

}

module.exports = new Products();
