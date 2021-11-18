export default async function pWaitFor(condition, interval = 20) {
  const promise = new Promise((resolve, reject) => {
    const check = async () => {
      const value = await condition();

      if (value === true) {
        resolve();
      } else {
        console.trace();
        setTimeout(check, interval);
      }
    };

    check();
  });

  return promise;
}

(async () => {
  const t = await pWaitFor(async () => false);

  setInterval(() => console.log("hi"), 1000);
})();
