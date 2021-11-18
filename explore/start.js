import WebSocket, { WebSocketServer } from "ws";
import { client } from "./client.js";
import { server } from "./server.js";

process.nextTick(() => console.log("what"));

Promise.resolve().then(() => console.log("Start Microtasks!"));

Promise.resolve().then(() => console.log("Before nextTick mircotask!"));
process.nextTick(() => {
  Promise.resolve().then(() => console.log("Process.nextTick | Microtask!"));

  Promise.resolve().then(() => console.log("End Microtasks!"));

  console.log("process next tick");
});

Promise.resolve().then(() => console.log("After nextTick mircotask!"));

setTimeout(() => {
  Promise.resolve().then(() => console.log("Settimeout | Microtask! \n"));
  console.log("Settimeout");
});

setImmediate(() => {
  Promise.resolve().then(() => console.log("IN immediate!"));
  console.log("setimmediate");
});

server(WebSocketServer);
client(WebSocket);
