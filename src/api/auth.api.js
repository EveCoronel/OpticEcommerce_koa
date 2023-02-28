const envConfig = require("../config/env.config");
const { getDAOS } = require("../models/dao/daos.factory");

class AuthApi {
  constructor() {
    this.AuthDao = getDAOS(envConfig.DATASOURCE).authDao;
  }
}

