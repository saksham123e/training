let p = new Promise((resolve, reject) => {
  resolve("Hello");
});

p.then((res) => {
  console.log(res);
});