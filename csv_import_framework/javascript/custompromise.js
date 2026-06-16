function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Success");
    }, 2000);
  });
}

getData().then((res) => {
  console.log(res);
});