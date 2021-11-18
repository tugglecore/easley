const timeout = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const waitFor = async (condition, interval) => {
  console.trace();

  await timeout(interval);

  const value = await condition;

  if (value === true) {
    return value;
  } else {
    console.trace();
    return waitFor(condition, interval);
  }
};

(async () => {
  console.trace();

  const t = await waitFor(() => false);

  console.log(nope);

  setInterval(() => console.log("hi"), 1000);
})();
