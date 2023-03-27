const socketio = require("socket.io");
const logger = require("./logs/logger");
const jwt = require('jsonwebtoken');
const envConfig = require("./config/env.config");
const { HttpError } = require("./utils/utils");

const socketLogic = async (server) => {

  const io = socketio(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      allowedHeaders: ['Authorization'],
      credentials: true,
      cors_allowed_origins: ['http://localhost:3000']
    }
  });


  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    try {
      const decoded = jwt.verify(token, envConfig.SECRET_KEY);
      socket.user = decoded.username;
      next();
    } catch (err) {
      next(401, "Authentication error", "Invalid token was provied")
    }
  });

  io.on("connection", (socket) => {
    logger.info("New user connected");
    /*  let newUser = {
       id: socket.id,
       username: 
 
     } */

    socket.on("chat message", (message) => {
      io.emit("chat message", message);
    });

    socket.on("disconnect", () => {
      logger.info("user disconnected");
    });
  });
};

module.exports = socketLogic;