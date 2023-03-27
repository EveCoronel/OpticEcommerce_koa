const Router = require("koa-router");
const productsRouter = require("./products.router");
const authRouter = require("./auth.router");
const cartRouter = require("./carts.router");
const configRouter = require("./config.router");
const userRouter = require("./users.router");
const authMiddleware = require("../middlewares/auth.middleware");

const router = new Router({ prefix: "/api" });

router.get("/chat", authMiddleware(), async (ctx, next) => {
    ctx.body = `
    <html>
      <head>
        <title>Socket.IO with Koa</title>
      </head>
      <body>
        <h1>Socket.IO with Koa</h1>
        <div id="messages"></div>
        <form id="form">
          <input type="text" id="message" autocomplete="off">
          <button type="submit">Send</button>
        </form>
        <script src="/socket.io/socket.io.js"></script>
        <script>
          const socket = io();

          const messagesDiv = document.getElementById('messages');
          const form = document.getElementById('form');
          const messageInput = document.getElementById('message');

          form.onsubmit = event => {
            event.preventDefault();
            const message = messageInput.value;
            socket.emit('chat message', message);
            messageInput.value = '';
          };

          socket.on('chat message', message => {
            const messageDiv = document.createElement('div');
            messageDiv.innerText = message;
            messagesDiv.appendChild(messageDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
          });
        </script>
      </body>
    </html>
  `;
})

router.use(productsRouter.routes());
router.use(cartRouter.routes())
router.use(configRouter.routes())
router.use(authRouter.routes());
router.use(userRouter.routes())

module.exports = router;
