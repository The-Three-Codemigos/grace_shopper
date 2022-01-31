// This is the Web Server
const express = require('express');
const server = express();

// enable cross-origin resource sharing to proxy api requests
// from localhost:3000 to localhost:4000 in local dev env
const cors = require('cors');
server.use(cors());

// create logs for everything
const morgan = require('morgan');
server.use(morgan('dev'));

// handle application/json requests
server.use(express.json());

// here's our static files
const path = require('path');
server.use(express.static(path.join(__dirname, 'build')));

// here's our API
server.use('/api', require('./api'));

// by default serve up the react app if we don't recognize the route
server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// bring in the DB connection
const { client } = require('./db');

// connect to the server
const PORT = process.env.PORT || 4000;

// define a server handle to close open tcp connection after unit tests have run
const handle = server.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}!`);

  // if server is running in github actions context skip db connection
  if (!process.env.CI) {
    try {
      await client.connect();
      console.log('Database is open for business!');
    } catch (error) {
      console.error('Database is closed for repairs!\n', error);
    }
  }
});

// export server and handle for routes/*.test.js
module.exports = { server, handle };
