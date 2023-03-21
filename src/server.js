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
const app = ws(new Koa());
const clients = new Set();

const pug = new Pug({
  viewPath: './src/public/views',
  basedir: 'path/for/pug/extends',
  app: app
})

const users = [];
const messages = [];

app.ws.use((ctx, next) => {
  clients.add(ctx.websocket);
  logger.info("User connected sucessfully");

  ctx.websocket.on("join-chat", (email) => {
    let newUser = {
      id: socket.id,
      email,
    };

    users.push(newUser);
  });

  ctx.websocket.on("message", (message) => {

    clients.forEach((client) => {
      console.log(client)
      if (client.readyState === 1) {
        client.send(message);
      }
    });
  });

  ctx.websocket.on("close", () => {
    clients.delete(ctx.websocket);
    logger.info("User disconnected succesfully");
  });

  return next(ctx);
});


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
