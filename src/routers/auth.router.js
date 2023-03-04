const Router = require("koa-router");
const authControllers = require("../controllers/auth.controllers");

const router = new Router({
  prefix: "/auth",
});

router.post("/login", authControllers.login);
router.post("/register", authControllers.register)


module.exports = router;
