function simulateAsyncOperation(timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (timeout < 1000) {
        reject('Error: timeout must be at least 1000 ms');
      } else {
        resolve(`Success: completed in ${timeout} ms`);
      }
    }, timeout);
  });
}

async function performAsyncTask(timeout) {
  try {
    const result = await simulateAsyncOperation(timeout);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

performAsyncTask(1500);
performAsyncTask(500);