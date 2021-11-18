export function server(WebSocketServer) {
  Promise.resolve().then(() => console.log("Server Microtask! \n"));

  console.log("server | before | start");

  const wss = new WebSocketServer({ port: 8080 });

  console.log("server | before | connection");

  wss.on("connection", function connection(ws) {
    console.log("client | during | connection");
    ws.on("message", function incoming(message) {
      console.log("received something from the client: %s", message);
    });

    ws.send("sent something from the server");
  });

  console.log("server | after | connection");
}
