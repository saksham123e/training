Promise.resolve(5)
  .then((num) => {
    console.log(num); 
    return num * 2;
  })
  .then((num) => {
    console.log(num); 
  });