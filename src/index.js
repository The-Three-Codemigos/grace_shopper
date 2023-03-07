import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';

const App = () => {
    return (
        <>
            {/* <Home /> */}
            <BrowserRouter>
                <Routes>
                    <Route
                        path='/'
                        element={<Home />}
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
