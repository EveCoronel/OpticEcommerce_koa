const bcrypt = require("bcrypt");
const envConfig = require("../config/env.config");
const { HTTP_STATUS } = require("../constants/api.constants");
const { getDAOS } = require("../models/dao/daos.factory");
const UserDTO = require("../models/dtos/users.dto");
const { getAge, HttpError } = require("../utils/utils");


class UsersApi {
  constructor() {
    this.UsersDao = getDAOS(envConfig.DATASOURCE).usersDao;
  }

  async getUsers() {
    return this.UsersDao.getAll();
  }

  async getUserById(_id) {
    return this.UsersDao.getById(_id);
  }

  async getUserByUsername(username) {
    return this.UsersDao.getByEmail(username);
  }

  async createUser(userPayload) {
    let doesUsernameExist = await this.UsersDao.getByEmail(userPayload.email)
    if (doesUsernameExist) {
      const message = `Resources with username: ${userPayload.email} does already exist in our records`;
      throw new HttpError(HTTP_STATUS.BAD_REQUEST, message);
    }
    try {
      userPayload.password = await bcrypt.hash(userPayload.password, 10);
      if (!userPayload.profilePicture) {
        userPayload.profilePicture = `Avatar${Math.floor(Math.random() * 12) + 1
          }.png`;
      }
      if (userPayload.birthDate) {
        userPayload.age = getAge(userPayload.birthDate);
      }
      if (!userPayload.admin) userPayload.admin = false;
      let newUser = new UserDTO(userPayload);
      return this.UsersDao.save(newUser);
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(_id) {
    return this.UsersDao.delete(_id);
  }
}

module.exports = UsersApi;
