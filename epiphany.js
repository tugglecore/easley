import { sleep } from "./wait-for.js";

const sleep_im = () => new Promise((r) => setImmediate(r));
const queueMacrotask = (f) => setTimeout(f);

export function createWebSocket(rehearsal) {
  let directions = { rejectionCount: false };
  let channel = {
    readyState: 3,
  };

  const updateChannel = () => {
    // channel = { ...channel, readyState: 1 };
    channel.readyState = 1;
  };

  const buildSummary = async () => {
    await sleep();
    return {
      isConnecting: channel.readyState === 0,
      isOpen: channel.readyState === 1,
    };
  };

  const api = {
    rejectConnection(rejectionCount) {
      if (typeof rejectionCount === "boolean")
        rejectionCount = Number.POSITIVE_INFINITY;
    },
  };

  const WebSocket = new Proxy(function () {}, {
    construct(_, options) {
      rehearsal(api);

      setTimeout(() => {
        updateChannel();
      });

      channel.readyState = 0;

      return channel;
    },
  });

  return {
    WebSocket,
    buildSummary,
  };
}
