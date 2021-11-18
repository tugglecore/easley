import tap from "tap";
import { sleep } from "./wait-for.js";
import { createWebSocket } from "./epiphany.js";

tap.test("Connect a socket", async (t) => {
  const rehearsal = () => {};
  const { WebSocket, buildSummary } = createWebSocket(rehearsal);

  const socket = new WebSocket();

  t.equal(socket.readyState, 0);

  let { isConnecting, isOpen } = await buildSummary();

  t.equal(socket.readyState, 1);
  t.notOk(isConnecting, "Socket is connected after creation");
  t.ok(isOpen, "Socket is connected after");
});

tap.skip("Refuse a connection", async (t) => {
  const rehearsal = ({ rejectConnection }) => {
    rejectConnection(true);
  };
  const { WebSocket, buildSummary } = createWebSocket(rehearsal);

  const socket = new WebSocket();

  t.equal(socket.readyState, 0);

  let { isConnecting } = await buildSummary();

  t.notOk(afterCreation);

  await sleep(4000);

  new WebSocket();

  let { isConnected: afterSleep } = await buildSummary();

  t.notOk(afterSleep, "Immutable summary references");
});
