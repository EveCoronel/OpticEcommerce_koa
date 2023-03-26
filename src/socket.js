const socketio = require("socket.io");
const logger = require("./logs/logger");

const socketLogic = async (server) => {
  const io = socketio(server);

  io.on("connection", (socket) => {
    logger.info("New user connected");

    socket.on("chat message", (message) => {
      io.emit("chat message", message);
    });

    socket.on("disconnect", () => {
      logger.info("user disconnected");
    });
  });
};

module.exports = socketLogic;