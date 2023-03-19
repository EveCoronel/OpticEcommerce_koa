const socketDefinition = (app) => {
  console.log("Here")
  const clients = new Set();

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
      logger.info(`New message was recive ==> ${message.toString("utf-8")}`);

      io.emit("messages", messages);
      clients.forEach((client) => {
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
};

module.exports = socketDefinition;
