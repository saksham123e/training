let p = new Promise((resolve, reject) => {
  reject("Error aa gaya");
});

p
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });