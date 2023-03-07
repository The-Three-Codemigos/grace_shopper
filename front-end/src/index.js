import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Products from './Components/Product';
import About from './Components/About';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Cart from './Components/Cart';

const App = () => {
  const [isLoggedin, setIsLoggedIn] = useState(false)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
        </Routes>
        <Routes>
          <Route
            path='/products'
            element={<Products />}
          />
          <Route
            path='/about'
            element={<About />}
          />
          <Route
            path='/login'
            element={<Login
              isLoggedin={isLoggedin}
              setIsLoggedIn={setIsLoggedIn}
            />}
          />
          <Route
            path='/profile'
            element={<Profile />}
          />
          <Route
            path='/cart'
            element={<Cart />}
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
