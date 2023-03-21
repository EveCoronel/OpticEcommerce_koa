
const UsersApi = require("../api/users.api");
const { HTTP_STATUS } = require("../constants/api.constants");
const { successResponse, HttpError } = require("../utils/utils");

const api = new UsersApi();

class CartsController {
    async getUsers(ctx) {
        try {
            const users = await api.getUsers()
            ctx.status = HTTP_STATUS.OK;
            ctx.body = successResponse(users, HTTP_STATUS.OK)
        } catch {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, "Unexpected error while geting the resources")
        }
    }

    async getUserByUsername(ctx) {
        try {
            const { username } = ctx.params;
            if (!username) {
                throw new HttpError(HTTP_STATUS.BAD_REQUEST, "Username must be provied")
            }
            const user = await api.getUserByUsername(username)
            ctx.status = HTTP_STATUS.OK;
            ctx.body = successResponse(user, HTTP_STATUS.OK)
        } catch {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, "Unexpected error while geting the resources")
        }
    }
}

module.exports = new CartsController();
