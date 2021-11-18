// import WebSocket, { WebSocketServer } from "ws";
// import fs from "fs";
const fs = require("fs");
// const WebSocketServer = require("ws");
let times = 0;
const clear = setInterval(() => {
  times++;
  console.log("start");
  if (times > 50) clearInterval(clear);
}, 100);

// const wss = new WebSocketServer({ port: 8080 });
const socks = (cb) => {
  queueMicrotask(() => {
    const stuff = cb();
    console.log("microtask", stuff);
  });
  setImmediate(() => {
    const stuff = cb();
    console.log("setImmediate", stuff);
  });
};

let info;

fs.readFile(__filename, "utf8", (err, bytesRead, buffer) => {
  // console.log(bytesRead);
  info = bytesRead;
  console.log(info);
});

socks(() => {
  // socket.send(info.schoolName)
  return info;
});

// wss.on("connection", function connection(ws) {
//   ws.on("message", function incoming(message) {
//     console.log("received something from the client: %s", message);
//   });

//   ws.send("sent something from the server");
// });
