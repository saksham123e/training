function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data fetched successfully");
        }, 2000);
    });
}

fetchData()
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });