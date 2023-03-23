const Router = require("koa-router");
const cartsController = require("../controllers/carts.controller");
const authMiddleware = require("../middlewares/auth.middleware");


const router = new Router({
  prefix: "/cart",
});

//Carts and products
router.get("/", authMiddleware(), cartsController.getCarts);
router.get("/:_id", authMiddleware(), cartsController.getCartById);
router.get("/:_id/products", authMiddleware(), cartsController.getProductsInCart);
router.post("/", authMiddleware(), cartsController.saveCart);
router.post("/:_id/products/:idProd", authMiddleware(), cartsController.updateCart);
router.delete("/:_id", authMiddleware(), cartsController.emptyCart);
router.delete("/:_id/products/:idProd", authMiddleware(), cartsController.deleteProductById);

//Checkout
router.post("/checkout/:username", authMiddleware(), cartsController.checkout)

module.exports = router;
