function fetchDataFromServer1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Data from server 1');
    }, 2000);
  });
}

function fetchDataFromServer2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Error from server 2');
    }, 1000);
  });
}

function fetchDataFromServer3() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Data from server 3');
    }, 3000);
  });
}

Promise.any([
  fetchDataFromServer1(),
  fetchDataFromServer2(),
  fetchDataFromServer3()
])
.then(result => {
  console.log('First successful response:', result);
})
.catch(error => {
  console.log('All promises failed:', error);
});

Promise.allSettled([
  fetchDataFromServer1(),
  fetchDataFromServer2(),
  fetchDataFromServer3()
])
.then(results => {
  console.log('All results:');
  console.log(results);
});