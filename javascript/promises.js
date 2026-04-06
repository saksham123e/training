let success = false;

let p = new Promise((resolve, reject) => {
  if (success) {
    resolve("Done");
  } else {
    reject("Failed");
  }
});

p
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });