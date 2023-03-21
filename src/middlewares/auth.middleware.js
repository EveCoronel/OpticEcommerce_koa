const jwt = require("jsonwebtoken");
const koaJwt = require("koa-jwt");
const envConfig = require("../config/env.config");
const { HTTP_STATUS } = require("../constants/api.constants");
const { HttpError } = require("../utils/utils");

const secretKey = envConfig.SECRET_KEY

function authMiddleware() {

  return async (ctx, next) => {
    const publicRoutes = ['/api/auth/register', "/api/auth/login"];

    if (publicRoutes.includes(ctx.request.url)) {
      await next();
    } else {
      const authHeader = ctx.request.headers.authorization;
      if (!authHeader) {
        ctx.throw(401, 'Missing authorization header');
      }
      const token = authHeader.replace('Bearer ', '');
      try {
        const decoded = jwt.verify(token, secretKey);
        ctx.state.user = decoded;
        await next();
      } catch (err) {
        if (err.message.includes("invalid signature")) {
          throw new HttpError(HTTP_STATUS.UNAUTHORIZED, "Invalid token")
        } else {
          throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, err.message)
        }
      }
    }
  }
}

/* function setUserContext() {
  return async (ctx, next) => {
    const token = ctx.headers.authorization;
    if (token && token.startsWith("Bearer ")) {
      try {
        const decoded = jwt.verify(
          token.substring("Bearer ".length),
          secretKey
        );
        ctx.state.user = decoded;
      } catch (err) {
        console.error("Failed to verify token:", err.message);
      }
    }
    await next();
  };
} */

module.exports = authMiddleware;
