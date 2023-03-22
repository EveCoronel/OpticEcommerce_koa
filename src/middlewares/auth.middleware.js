const envConfig = require("../config/env.config");
const koaJwt = require('koa-jwt');

const secretKey = envConfig.SECRET_KEY

const authMiddleware = () => {
  return koaJwt({ secret: secretKey, key: 'token' });
}

module.exports = authMiddleware;
