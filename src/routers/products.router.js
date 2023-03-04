const Router = require("koa-router");
const productsController = require("../controllers/products.controllers");
const {
  authMiddleware,
  setUserContext,
} = require("../middlewares/auth.middleware");

const router = new Router({
  prefix: "/products",
});

router.get("/", authMiddleware(), setUserContext(), productsController.getProducts);
router.get("/:_id", productsController.getProductById);
router.get("/category/:category", productsController.getProductsByCategory);
router.post("/", productsController.saveProduct);
router.put("/:_id", productsController.updateProduct);
router.delete("/:_id", productsController.deleteProduct);

module.exports = router;
