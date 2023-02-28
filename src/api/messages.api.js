const envConfig = require("../config/env.config");
const { HTTP_STATUS } = require("../constants/api.constants");
const { getDAOS } = require("../models/dao/daos.factory");
const MessageDTO = require("../models/dtos/messages.dto");
const { HttpError } = require("../utils/utils");

class MessagesApi {
  constructor() {
    this.messagesDao = getDAOS(envConfig.DATASOURCE).messagesDao;
  }

  async getMessages() {
    return this.messagesDao.getAll();
  }

  async getMessagesByUsername(username) {
    if (!username) {
      throw HttpError(HTTP_STATUS.BAD_REQUEST, `username must be provided it`);
    }
    return this.messagesDao.getByUsername(username);
  }

  async createMessage({username, text}) {
    let newMessage = new MessageDTO(username, text);
    return this.messagesDao.save(newMessage);
  }

  async deleteMessage(_id) {
    if (!_id) {
      throw HttpError(HTTP_STATUS.BAD_REQUEST, `id must be provided it`);
    }
    return this.messagesDao.delete(_id);
  }
}

module.exports = MessagesApi;
