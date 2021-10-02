// code to build and initialize DB goes here
const {
  client,
  // other db methods
} = require('./index');

async function buildTables() {
  try {
    client.connect();

    console.log('these are some fake changes!!!');

    return 'cool';

    // build tables in correct order
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
