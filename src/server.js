const Koa = require("koa");
const envConfig = require("./config/env.config");
const logger = require("./logs/logger");
const { koaBody } = require("koa-body");
const apiRoutes = require("./routers/api.routes");
const MongoRepository = require("./models/Repository/mongo.repository");
const cors = require('@koa/cors');
const Pug = require('koa-pug');
const errorMiddleware = require("./middlewares/error.middleware");
const ws = require("koa-websocket");
const socketDefinition = require("./socket");
const app = ws(new Koa());


new Pug({
  viewPath: './src/public/views',
  basedir: 'path/for/pug/extends',
  app: app
})

app.ws.use(socketDefinition());

app.use(koaBody());
app.use(cors());
app.use(errorMiddleware);
app.use(apiRoutes.routes());


app.listen(envConfig.PORT, async () => {
  logger.info(`Server is up and running on PORT ${envConfig.PORT}`);
  await MongoRepository.connect().then(() => {
    logger.info("Connected to DB!");
  });
  logger.info(`Using ${envConfig.DATASOURCE} as data source`);
});
