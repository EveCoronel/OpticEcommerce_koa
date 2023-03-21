const MongoRepository = require("../../Repository/mongo.repository");
const { HTTP_STATUS } = require("../../../constants/api.constants");
const { HttpError } = require("../../../utils/utils");
const OrderSchema = require("../../schemas/Order.schema");

const collection = "orders";


class DaoOrdersMongo extends MongoRepository {
    constructor() {
        super(collection, OrderSchema);
    }
}

module.exports = new DaoOrdersMongo();
