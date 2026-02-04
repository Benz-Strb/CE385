function fetchDataWithCallback(callback) {
  setTimeout(() => {
    callback(null, 'Data from callback');
  }, 2000);
}

fetchDataWithCallback((error, data) => {
  if (error) {
    console.log('Callback Error:', error);
  } else {
    console.log('Callback Result:', data);
  }
});

function fetchDataWithPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Data from promise');
    }, 2000);
  });
}

fetchDataWithPromise()
  .then(data => {
    console.log('Promise Result:', data);
  })
  .catch(error => {
    console.log('Promise Error:', error);
  });