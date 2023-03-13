import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Products from './Components/Product';
import About from './Components/About';
import Profile from './Components/Profile';
import Admin from './Components/Admin';

const App = () => {

  const API_URL = "https://grace-shoper.onrender.com/api/";
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState("")

  useEffect(() => {
    const localToken = window.localStorage.getItem('token');
    setToken(localToken)
    if (localToken) {
      setIsLoggedIn(true)
    }
    if (token) {
      fetch(`${API_URL}users/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localToken}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result)
        })
        .catch((error) => console.log(error));
    }
  }, []);

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
        <Route
            path='/admin'
            element={<Admin isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} API_URL={API_URL} />}
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
