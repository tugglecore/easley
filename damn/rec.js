function recurse() {
  // ...
  console.trace();
  recurse();
  // ...
}
recurse(); // setInterval will never run
