import EventEmitter from "events";
const emmiter = new EventEmitter();
import { buildConsumer } from "./consumer.js";
import { server } from "./producer.js";

export default function createWebsocket() {
  const socket = {
    send(msg) {
      emmiter.emit("onmessage", msg);
    },
  };

  emmiter.on("connect", () => {
    server.connectionCb(socket);
  });

  const WebSocket = buildConsumer(emmiter);

  return {
    server,
    WebSocket,
  };
}
