setImmediate(() => process.exit());

const nt_recursive = () =>
  process.nextTick(() => {
    setImmediate(() => console.log("Here"));

    console.log("Called nt_recursize");
    setImmediate(() => console.log("Here"));

    p_recursive();
    setImmediate(() => console.log("Here"));
  });

setImmediate(() => process.exit());

const p_recursive = () =>
  Promise.resolve().then(() => {
    setImmediate(() => console.log("Here"));
    console.log("Called p_recursive");
    setImmediate(() => console.log("Here"));

    nt_recursive();
    setImmediate(() => console.log("Here"));
  });

p_recursive();

setImmediate(() => process.exit());
