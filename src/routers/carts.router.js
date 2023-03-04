const Router = require("koa-router");
const cartsController = require("../controllers/carts.controller");

const {
  authMiddleware,
  setUserContext,
} = require("../middlewares/auth.middleware");

const router = new Router({
  prefix: "/carts",
});

router.get("/", authMiddleware(), setUserContext(), cartsController.getCarts);
router.get("/:_id", authMiddleware(), setUserContext(), cartsController.getCartById);
router.get(
  "/:_id/products",
  /* authMiddleware(),
  setUserContext(), */
  cartsController.getProductsInCart
);
router.post("/", authMiddleware(), setUserContext(), cartsController.saveCart);
router.post(
  "/:_id/products/:idProd",
  authMiddleware(),
  setUserContext(),
  cartsController.updateCart
);
router.delete(
  "/:_id",
  authMiddleware(),
  setUserContext(),
  cartsController.emptyCart
);
router.delete(
  "/:_id/products/:idProd",
  authMiddleware(),
  setUserContext(),
  cartsController.deleteProductById
);

module.exports = router;
