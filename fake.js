import tap from "tap";
import createWebsocket from "./easley.js";

tap.test("send message from server to client", (t) => {
  const { server, WebSocket } = createWebsocket();

  server.on("connection", (socket) => {
    socket.send("test message from mock server");
  });

  const client = new WebSocket("ws://not-real");

  client.on("onmessage", (msg) => {
    t.equal(msg, "test message from mock server");
    t.end();
  });
});

tap.test("send message from server to multiple clients", (t) => {
  const { server, WebSocket } = createWebsocket();

  server.on("connection", (socket) => {
    socket.send("test message from mock server");
  });

  const client1 = new WebSocket("ws://not-real");

  client1.on("onmessage", (msg) => {
    t.equal(msg, "test message from mock server");
  });

  const client2 = new WebSocket("ws://not-real");

  client2.on("onmessage", (msg) => {
    t.equal(msg, "test message from mock server");
    t.end();
  });
});
