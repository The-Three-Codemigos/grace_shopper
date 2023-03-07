import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Products from './Components/Product';
import About from './Components/About';

const App = () => {
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
        </Routes>
      </BrowserRouter>
    </>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
