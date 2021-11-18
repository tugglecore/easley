import tap from "tap";
import { createWebSocket } from "./fake-websocket.js";

tap.test("send event from source to sink", (t) => {
  const { WebSocket, Server } = createWebSocket();

  Server.on("connection", (socket) => {
    socket.send("test message");
  });

  const client1 = new WebSocket();

  client1.on("message", (msg) => {
    t.equal(msg, "test message");
  });

  const client2 = new WebSocket();

  client2.on("message", (msg) => {
    t.equal(msg, "test message");
    t.end();
  });
});

///////////////////////////////////////////////////////

export default async function pWaitFor(condition, options = {}) {
  const { interval, timeout, before } = options;

  let retryTimeout;

  const promise = new Promise((resolve, reject) => {
    const check = async () => {
      try {
        const value = await condition();

        if (value === true) {
          resolve();
        } else {
          retryTimeout = setTimeout(check, interval);
        }
      } catch (error) {
        reject(error);
      }
    };

    retryTimeout = setTimeout(check, interval);
  });

  return promise;
}
