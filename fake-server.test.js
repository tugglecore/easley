import test from "ava";
import { client } from "./client.js";
import { createFakeServer } from "./fake-server.js";

//   firstSocket.sendOnConnection('easley');

test("Server send open event to client", (t) => {
  const { firstSocket, firstClient, WebSocket } = createFakeServer();
  firstSocket.onConnection(() => {
    firstSocket.send("easley");
  });

  const client = new WebSocket("ws://not-real");
  client.on("open", () => {});

  t.is(firstClient.fakeMessages[0], "easley");
});

test("Socket recieve message from server", (t) => {
  const { firstSocket, firstClient, WebSocket } = createFakeServer();
  firstSocket.onConnection(() => {
    firstSocket.send("easley");
  });

  new WebSocket("ws://not-real");

  t.is(firstClient.fakeMessages[0], "easley");
});

test("Server send open event to client", (t) => {
  const { firstSocket, fakeServer, connectSockets, firstClient, WebSocket } =
    createFakeServer();

  fakeServer.on("connection", (firstSocket) => {
    firstSocket.send("test message from mock server");
    firstSocket.on("message", (data) => {
      t.is(
        data,
        "test message from app",
        "we have intercepted the message and can assert on it"
      );
      firstSocket.send("test message from mock server");
    });
  });

  const client = new WebSocket("ws://not-real");
  client.on("onmessage", () => {});

  client.send("Hello Server");

  await connectSockets();

  t.is(firstClient.fakeMessages[0], "easley");
});
