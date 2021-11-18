export function buildConsumer(emmiter) {
  return function () {
    queueMicrotask(() => {
      emmiter.emit("connect");
    });
    emmiter.on("onmessage", (m) => onCb(m));
    let onCb = undefined;
    this.on = (e, cc) => {
      onCb = cc;
    };
    this.send = () => {};
  };
}
