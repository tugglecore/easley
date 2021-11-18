function createSocket(Server) {
  return function WebSocket() {
    const events = new Map();

    const myself = {
      on(event, listnener) {
        events.has(event)
          ? events.get(event).push(listnener)
          : events.set(event, [listnener]);
      },
      send(msg) {
        const listeners = events.get("message");
        listeners.forEach((listener) => {
          listener(msg);
        });
      },
    };

    queueMicrotask(() => {
      Server.emit("connection", myself);
    });

    return myself;
  };
}

function Server() {
  const events = new Map();
  return {
    on(event, listnener) {
      events.has(event)
        ? events.get(event).push(listnener)
        : events.set(event, [listnener]);
    },
    emit(event, ...args) {
      const listeners = events.get(event);
      listeners.forEach((listener) => {
        listener(...args);
      });
    },
  };
}

export function createWebSocket() {
  const s = Server();
  return {
    Server: s,
    WebSocket: createSocket(s),
  };
}
