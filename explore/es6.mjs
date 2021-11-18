Promise.resolve().then(() => console.log("Start Microtasks!"));

process.nextTick(() => console.log("nextTick!"));

console.log("ES6 expirement");

(async () => {
  await next tick
})();
