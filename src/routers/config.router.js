const Router = require("koa-router");
const envConfig = require("../config/env.config");
const authMiddleware = require("../middlewares/auth.middleware");

const router = new Router({
    prefix: "/admin/config",
});

router.get("/",async (ctx) => {
    await ctx.render('config', {config: envConfig}, true)
});

module.exports = router;
