const moment = require("moment");

class HttpError {
  constructor(status, message, details) {
    this.statusCode = status;
    this.message = message;
    this.details = details;
  }
}

const successResponse = (data, statusCode = 200) => {
  return {
    success: true,
    statusCode,
    data,
  };
};

const errorResponse = (error, statusCode = 200) => {
  return {
    success: false,
    statusCode,
    details: error,
  };
};

const formatMessage = (username, text) => {
  return {
    username,
    text,
    time: moment().format("DD/MM/YYYY - HH:mm"),
  };
};

const formatUser = (name) => {
  return {
    name: name,
  };
};

module.exports = {
  formatUser,
  formatMessage,
  successResponse,
  errorResponse,
  HttpError,
};
