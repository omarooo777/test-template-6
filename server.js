const StaticServer = require("static-server");
const server = new StaticServer({
  rootPath: "./dist/",
  port: 555,
});

server.start(function () {
  console.log("Server Started At Port:", server.port);
});
