const socketio = require("socket.io");
const logger = require("./logs/logger");
const jwt = require('jsonwebtoken');
const envConfig = require("./config/env.config");
const MessagesApi = require("./api/messages.api");
const MessageDTO = require("./models/dtos/messages.dto");

const socketLogic = async (server) => {

  const messageApi = new MessagesApi;

  const io = socketio(server, {
    cors: {
      origin: ['http://localhost:3000', 'https://see-sharp-store-git-main-evecoronel.vercel.app', 'https://see-sharp-store.vercel.app'],
      methods: ['GET', 'POST'],
      allowedHeaders: ['Authorization'],
      credentials: true,
      cors_allowed_origins: ['http://localhost:3000', 'https://see-sharp-store-git-main-evecoronel.vercel.app', 'https://see-sharp-store.vercel.app']
    }
  });


  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    try {
      const decoded = jwt.verify(token, envConfig.SECRET_KEY);
      socket.username = decoded.username;
      next();
    } catch (err) {
      next(401, "Authentication error", "Invalid token was provied")
    }
  });


  io.on("connection", async (socket) => {
    logger.info("New user connected");

    socket.emit('messages', await messageApi.getMessages());

    socket.on("new-message", async (message) => {
      let newMessage = new MessageDTO(socket.username, message)
      await messageApi.createMessage(newMessage)
      io.emit('messages', await messageApi.getMessages());
    });

    socket.on("disconnect", () => {
      logger.info("user disconnected");
    });
  });
};

module.exports = socketLogic;