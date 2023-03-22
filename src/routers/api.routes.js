const Router = require("koa-router");
const productsRouter = require("./products.router");
const authRouter = require("./auth.router");
const cartRouter = require("./carts.router");
const configRouter = require("./config.router");
const userRouter = require("./users.router")

const router = new Router({ prefix: "/api" });

router.use(productsRouter.routes());
router.use(cartRouter.routes())
router.use(configRouter.routes())
router.use(authRouter.routes());
router.use(userRouter.routes())

module.exports = router;
