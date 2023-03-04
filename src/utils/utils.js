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

const errorResponse = (error, statusCode = 200, details = false) => {
  let response = {
    success: false,
    statusCode,
    message: error,
  };
  if (details) response.details = details;
  return response;
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

const getAge = (birthdate) => {
  let today = new Date();
  let birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

module.exports = {
  formatUser,
  formatMessage,
  successResponse,
  errorResponse,
  HttpError,
  getAge
};
