import React from 'react';
import Header from './Header';

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
    return (
        <>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <h1>Login</h1>
        </>
    )
}

export default Login
