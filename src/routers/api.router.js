const Router = require('koa-router');
const productsRoutes = require("./products.router");

const router = new Router({ prefix: '/api' });

router.use(productsRoutes.routes());

module.exports = router;
