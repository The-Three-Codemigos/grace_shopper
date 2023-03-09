import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Products from './Components/Product';
import About from './Components/About';
import Profile from './Components/Profile';

const App = () => {
  const API_URL = "https://grace-shoper.onrender.com/api/";
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} API_URL={API_URL} />}
          />
        </Routes>
        <Routes>
          <Route
            path='/products'
            element={<Products API_URL={API_URL} />}
          />
          <Route
            path='/about'
            element={<About />}
          />
          <Route
            path='/profile'
            element={<Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} API_URL={API_URL} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
