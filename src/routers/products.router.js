const Router = require("koa-router");
const productsController = require("../controllers/products.controllers");

const router = new Router({
  prefix: "/products",
});

router.get("/", productsController.getProducts);
router.get("/:_id", productsController.getProductById);

module.exports = router;
