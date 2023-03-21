const Router = require("koa-router");
const productsController = require("../controllers/products.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

const router = new Router({
  prefix: "/products",
});

router.get("/", authMiddleware(), productsController.getProducts);
router.get("/:_id", authMiddleware(), productsController.getProductById);
router.get("/category/:category", authMiddleware(), productsController.getProductsByCategory);
router.post("/", authMiddleware(), productsController.saveProduct);
router.put("/:_id", authMiddleware(), productsController.updateProduct);
router.delete("/:_id", authMiddleware(), productsController.deleteProduct);

module.exports = router;
