export function client(WebSocket) {
  console.log("client | before | start");

  const ws = new WebSocket("ws://localhost:8080");

  console.log("client | before | open");

  ws.on("open", function open() {
    console.log("client | during | open");
    ws.send("something");
  });

  console.log("client | after | open");

  ws.on("message", function incoming(message) {
    console.log("received something from the server: %s", message);
  });

  console.log("client | after | message");
}
