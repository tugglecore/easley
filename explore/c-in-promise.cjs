setTimeout(() => {
  console.log("timer");
});

setImmediate(() => {
  console.log("immediate");
});

Promise.resolve().then(function wrapper() {
  process.nextTick(function ticks() {
    console.log("nextTick");
  });
  Promise.resolve().then(function promises() {
    process.nextTick(function ticks() {
      console.log("2");
    });

    console.log("Promise");

    process.nextTick(function ticks() {
      console.log("3");
    });
  });
});
/*
Step 1:
promises: []
nextTicks: []

Step 2:
promises: [wrapper]
nextTicks: []

Step 3: 
promises: [wrapper, promises]
nextTicks: [ticks]
*/
