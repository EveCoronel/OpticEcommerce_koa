const Router = require("koa-router");
const usersController = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middleware");



const router = new Router({
    prefix: "/users",
});

router.get("/", authMiddleware(), usersController.getUsers);
router.get("/:username", authMiddleware(), usersController.getUserByUsername);


module.exports = router;
