import React, { useState, useEffect } from 'react';
// this function is defined in our front-end api directory
// you can think of that directory as a collection of services
// where each service makes a network request to retrieve
// information from our express server's /api route
import { getAPIHealth } from '../api';

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(
    () => {
      const apiStatus = getAPIHealth();
      // set your message variable to the apiStatus retrieved above
    },
    [
      /* add any dependencies you'd like to track to this array */
    ]
  );

  return (
    <div className="App">
      <h1>Hello, World!</h1>
      <h2>{message}</h2>
    </div>
  );
};

export default App;
