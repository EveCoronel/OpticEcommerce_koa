const jwt = require("jsonwebtoken");
const koaJwt = require("koa-jwt");
const envConfig = require("../config/env.config");

const secretKey = envConfig.SECRET_KEY

function authMiddleware() {
  return koaJwt({ secret: secretKey, algorithms: ["HS256"] }).unless({
    path: [/^\/public/],
  });
}

function setUserContext() {

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
}

module.exports = { authMiddleware, setUserContext };
