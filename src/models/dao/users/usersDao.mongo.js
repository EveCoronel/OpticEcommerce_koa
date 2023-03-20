const MongoRepository = require("../../Repository/mongo.repository");
const { HttpError } = require("../../../utils/utils");
const { HTTP_STATUS } = require("../../../constants/api.constants");
const userSchema = require("../../schemas/User.schema");

const collection = "users";

class Users extends MongoRepository {
  constructor() {
    super(collection, userSchema);
  }

  async getByEmail(username) {
    const document = await this.model.findOne({ email: username }, { __v: 0 });
    return document;
  }
}

module.exports = new Users();
