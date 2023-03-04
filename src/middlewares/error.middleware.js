const { HTTP_STATUS } = require("../constants/api.constants");
const logger = require("../logs/logger");
const { errorResponse } = require("../utils/utils");

module.exports = async function errorMiddleware(ctx, next) {
  try {
    await next();
  } catch (err) {
    const errorStatus = err.statusCode || HTTP_STATUS.INTERNAL_ERROR;
    const errorMessage = err.message || "There was an unexpected error";
    const errorDetails = err.details || "";
    if (errorStatus == 505) {
      logger.error(`unexpected error: ${error}`);
    }
    const response = errorResponse(errorMessage, errorStatus, errorDetails);
    ctx.status = +errorStatus;
    ctx.body = response;
  }
};
