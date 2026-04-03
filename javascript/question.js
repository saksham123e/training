function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data loaded");
        }, 2000);
    });
}

async function getData() {
    let result = await fetchData();
    console.log(result);
}

getData();