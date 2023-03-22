const UsersApi = require("../api/users.api");
const { HTTP_STATUS } = require("../constants/api.constants");
const { successResponse, getAge } = require("../utils/utils");
const bcrypt = require("bcrypt");
const CartsApi = require("../api/carts.api");
const jwt = require("jsonwebtoken");
const envConfig = require("../config/env.config");

const cartApi = new CartsApi();
const api = new UsersApi();

class AuthController {
  async login(ctx) {
    const { username, password } = ctx.request.body;
    let userFound = await api.getUserByUsername(username);
    let isValidPassword = await bcrypt.compare(password, userFound.password);
    if (isValidPassword) {
      const token = jwt.sign({ username }, envConfig.SECRET_KEY, { expiresIn: envConfig.SESSION_TIME });
      const response = successResponse({ token: token }, HTTP_STATUS.OK);
      ctx.body = response;
    } else {
      ctx.throw(401, "Invalid credentials");
    }
  }

  async register(ctx) {
    let { username, password, address, birthDate, phoneNumber } =
      ctx.request.body;
    let cart = await cartApi.createCart();
    let profilePicture = `Avatar${Math.floor(Math.random() * 12) + 1}.png`;
    let newUser = {
      email: username,
      password,
      address: address,
      age: getAge(birthDate),
      birthDate,
      phoneNumber,
      cart: cart._id,
      profilePicture,
    };
    const user = await api.createUser(newUser);
    ctx.status = HTTP_STATUS.CREATED;
    ctx.body = successResponse(user, HTTP_STATUS.CREATED);
  }
}

module.exports = new AuthController();
