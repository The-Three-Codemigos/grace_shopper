import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Products from './Components/Product';
import About from './Components/About';

const App = () => {
  const API_URL = "https://grace-shoper.onrender.com/api/"
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
            element={<Products API_URL={API_URL} />}
          />
          <Route
            path='/about'
            element={<About />}
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
