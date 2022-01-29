import React, { useState, useEffect } from 'react';
// this function is defined in our front-end api directory
// you can think of that directory as a collection of services
// where each service makes a network request to retrieve
// information from our express server's /api route
import { getAPIHealth } from '../axios-services';

const App = () => {
  const [APIHealth, setAPIHealth] = useState('');

  useEffect(() => {
    // follow this pattern inside your useEffect calls
    // create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };

    // after you've defined your getter above
    // invoke it here, inside the useEffect callback
    getAPIStatus();
  }, []);

  return (
    <div className="App">
      <h1>Hello, World!</h1>
      <p>API Status: {APIHealth}</p>
    </div>
  );
};

export default App;
