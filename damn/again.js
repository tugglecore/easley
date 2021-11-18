export default async function again(condition) {
  const promise = new Promise((resolve) => {
    const check = () => {
      condition().then((ok) => {
        if (ok === true) {
          resolve();
        } else {
          setTimeout(check, 20);
        }
      });
    };

    check();
  });

  return promise;
}

(async () => {
  const t = await again(async () => false);

  setInterval(() => console.log("hi"), 1000);
})();
