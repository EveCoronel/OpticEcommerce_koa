const Koa = require("koa");
const envConfig = require("./config/env.config");
const logger = require("./logs/logger");
const { koaBody } = require("koa-body");
const apiRoutes = require("./routers/api.router");
const MongoRepository = require("./models/Repository/mongo.repository");


const app = new Koa();

const errorMiddleware = require("./middlewares/error.middleware");

app.use(koaBody());
app.use(errorMiddleware);
app.use(apiRoutes.routes());



app.listen(envConfig.PORT, async () => {
  logger.info(`Server is up and running on PORT ${envConfig.PORT}`);
  await MongoRepository.connect().then(() => {
    logger.info("Connected to DB!");
  });
  logger.info(`Using ${envConfig.DATASOURCE} as data source`);
});
