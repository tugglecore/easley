const work = [9];

const te = new Proxy(work, {
  get(target, prop) {
    console.log(target);
    console.log(prop);
    return [];
  },
});
console.log(Array.isArray(te));
const [what] = te;

console.log(what);
