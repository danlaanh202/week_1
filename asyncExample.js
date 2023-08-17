const p1 = new Promise((resolve, reject) => {
  resolve(10);
});

(async () => {
  await p1.then((data) => console.log(data));
})();
