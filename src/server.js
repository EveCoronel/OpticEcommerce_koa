const Koa = require("koa");
const envConfig = require("./config/env.config");
const logger = require("./logs/logger");
const { koaBody } = require("koa-body");
const apiRoutes = require("./routers/api.routes");
const MongoRepository = require("./models/Repository/mongo.repository");
const cors = require('@koa/cors');
const Pug = require('koa-pug');
const errorMiddleware = require("./middlewares/error.middleware");
const http = require('http');
const socketLogic = require('./socket');

const app = new Koa();
const server = http.createServer(app.callback());

socketLogic(server);

new Pug({
  viewPath: './src/public/views',
  basedir: 'path/for/pug/extends',
  app: app
})

app.use(koaBody());
app.use(cors());
app.use(errorMiddleware);
app.use(apiRoutes.routes());


server.listen(envConfig.PORT, async () => {
  logger.info(`Server is up and running on PORT ${envConfig.PORT}`);
  await MongoRepository.connect().then(() => {
    logger.info("Connected to DB!");
  });
  logger.info(`Using ${envConfig.DATASOURCE} as data source`);
});
