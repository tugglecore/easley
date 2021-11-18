// test/hello-world.js
// const tap = require("tap");
import tap from "tap";
console.log("where am i?");
console.log("so I am in a process: ", process.env.TAP_CHILD_ID);
tap.pass("this is fine");
