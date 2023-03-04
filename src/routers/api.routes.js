const Router = require("koa-router");
const productsRouter = require("./products.router");
const authRouter = require("./auth.router");
const cartRouter = require("./carts.router");

const router = new Router({ prefix: "/api" });

router.use(productsRouter.routes());
router.use(authRouter.routes());
router.use(cartRouter.routes())

module.exports = router;
