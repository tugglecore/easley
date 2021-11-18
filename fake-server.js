export function createFakeServer() {
  const sockets = [
    {
      client: undefined,
      callback: undefined,
      onConnection(fn) {
        this.callback = () => {
          fn();
        };
      },
      connected(client) {
        this.client = client;
        this.callback();
      },
      send(stuff) {
        this.client.fakeMessages.push(stuff);
      },
    },
  ];

  const clients = [
    {
      fakeMessages: [],
      on (event, cb) {
          
      }
    },
  ];

  const firstSocket = sockets[0];
  const firstClient = clients[0];

  const WebSocket = new Proxy(function () {}, {
    construct(target, args) {
      sockets.forEach((socket) => {
        socket.connected(firstClient);
      });
      return new target(...args);
    },
  });

  return {
    firstSocket,
    firstClient,
    WebSocket,
  };
}
