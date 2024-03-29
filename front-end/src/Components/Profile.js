import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import Admin from './Admin';
import './style/Profile.css'

const Profile = ({ isLoggedIn, setIsLoggedIn, API_URL, setToken, user, token }) => {
    const [showLoginModal, setShowLoginModal] = useState(false)
    const btnClicked = () => {
        setShowLoginModal(!showLoginModal)
    }

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            {!isLoggedIn ?
                <section className='loginSection'>
                    <h1>You are not signed in</h1>
                    <p>Sign in to see your profile</p>
                    <button className='signInBtn' onClick={() => btnClicked()}>Sign In</button>
                    <Link to='/products'><button className='continueShoping'>Continue Shopping</button></Link>
                    {showLoginModal &&
                        <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} API_URL={API_URL} showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} setToken={setToken} />
                    }
                </section> :
                <section className='usersInfo'>
                    <h1>You are logged in {user.firstName}!</h1>

                </section>
            }
            {/* {user.user.isAdmin &&
                <Admin isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} API_URL={API_URL} token={token} />
            } */}
        </>
    )
}

export default Profile
