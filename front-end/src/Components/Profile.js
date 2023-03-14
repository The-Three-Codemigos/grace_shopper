import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import './style/Profile.css'

const Profile = ({ isLoggedIn, setIsLoggedIn, API_URL }) => {
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
                        <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} API_URL={API_URL} showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />
                    }
                </section> :
                <section className='usersInfo'>
                    <h1>You are logged in!</h1>
                    {/* Here the user will be able to see the order history and user info or if admin then show the settings for admin */}
                </section>
            }
        </>
    )
}

export default Profile
