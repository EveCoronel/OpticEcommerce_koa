const mongoose = require("mongoose");
const dbConfig = require("../../config/db.config");
const { HTTP_STATUS } = require("../../constants/api.constants");
const { HttpError } = require("../../utils/utils");

mongoose.set("strictQuery", false);

class MongoRepository {
  constructor(collection, schema) {
    this.model = mongoose.model(collection, schema);
  }

  static async connect() {
    await mongoose.connect(dbConfig.mongodb.uri);
  }

  static async disconnect() {
    await mongoose.disconnect();
  }

  async getAll(filter = {}) {
    const documents = await this.model.find(filter, { __v: 0 }).lean();
    return documents;
  }

  async getById(id) {
    try {
      const document = await this.model.findOne({ _id: id }, { __v: 0 });
      if (!document) {
        return null;
      }
      return document;
    } catch (err) {
      throw new HttpError(
        HTTP_STATUS.NOT_FOUND,
        "Resource with id provied could not be found",
        err.message
      );
    }
  }

  async save(item) {
    try {
      const newDocument = new this.model(item);
      return await newDocument.save();
    } catch (err) {
      throw new HttpError(
        HTTP_STATUS.BAD_REQUEST,
        "Resource could not be created successfully",
        err.message
      );
    }
  }

  async update(id, item) {
    try {
      const updatedDocument = await this.model.updateOne(
        { _id: id },
        { $set: { ...item } }
      );
      if (!updatedDocument.matchedCount) {
        return null;
      }
      return updatedDocument;
    } catch (err) {
      throw new HttpError(
        HTTP_STATUS.BAD_REQUEST,
        "Resource could not be updated successfully",
        err.message
      );
    }
  }

  async delete(id) {
    try {
      let deletedDocument = await this.model.deleteOne({ _id: id });
      if (!deletedDocument.deletedCount) {
        return null;
      }
      return deletedDocument
    } catch (err) {
      throw new HttpError(
        HTTP_STATUS.BAD_REQUEST,
        "Resource could not be deleted successfully",
        err.message
      );
    }
  }
}

module.exports = MongoRepository;
