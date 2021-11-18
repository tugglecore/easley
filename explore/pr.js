// test/hello-world.js
// const tap = require("tap");
import tap from "tap";
tap.jobs = 2;

// console.log("where am i again?");
// console.log("so I am in a new process: ", process.env.TAP_CHILD_ID);
// tap.pass("this is fine");

console.log("so I am in a new process: ", process.env.TAP_CHILD_ID);
let slowGoing = true;
tap.test("slow child", (tt) => {
  console.log("so I am in a new process: ", process.env.TAP_CHILD_ID);
  setTimeout((_) => {
    console.log("so I am in a new process: ", process.env.TAP_CHILD_ID);
    slowGoing = false;
    tt.end();
  }, 200);
  console.log("so I am in a new process: ", process.env.TAP_CHILD_ID);
});
console.log("so I am in a new process: ", process.env.TAP_CHILD_ID);
tap.test("fast child", (tt) => {
  console.log("so I am in a new process: ", process.env.TAP_CHILD_ID);
  setTimeout((_) => {
    console.log("so I am in a new process: ", process.env.TAP_CHILD_ID);
    tt.ok(slowGoing, "slow is going");
    tt.end();
  });
  console.log("so I am in a new process: ", process.env.TAP_CHILD_ID);
});
console.log("so I am in a new process: ", process.env.TAP_CHILD_ID);
