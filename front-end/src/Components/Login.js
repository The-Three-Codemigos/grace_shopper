import React, { useState } from 'react';
import './style/Login.css'

const Login = ({ isLoggedIn, setIsLoggedIn, API_URL, showLoginModal, setShowLoginModal, setUser, setToken }) => {
    const [email, setEamil] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [emailReg, setEmailReg] = useState("")
    const [passwordReg, setPasswordReg] = useState("")
    const [register, setRegister] = useState(false)
    const [hideLogForm, setHideLogForm] = useState(false)
    const [userNameTaken, setUserNameTaken] = useState(false)
    const [validInfo, setValidInfo] = useState(true)
    const [weakPass, setWeakPass] = useState(false)
    const [registered, setRegistered] = useState(false)

    const btnClicked = () => {
        setShowLoginModal(!showLoginModal)
    }

    const registerPage = () => {
        setRegister(!register)
        setHideLogForm(!hideLogForm)
    }

    const handleChangeEmail = (event) => {
        setEamil(event.target.value)
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }
    const handleChangeFirstName = (event) => {
        setFirstName(event.target.value)
    }
    const handleChangeLastName = (event) => {
        setLastName(event.target.value)
    }
    const handleChangeEmailReg = (event) => {
        setEmailReg(event.target.value)
    }
    const handleChangePasswordRegister = (event) => {
        setPasswordReg(event.target.value)
    }

    const loggedInAlert = () => {
        return (
            <div class="alertGreen">
                <strong>Logged In</strong>
            </div>
        )
    }
    const wrongUserAlert = () => {
        return (
            <div class="alert">
                <strong>Wrong email or password</strong>
            </div>
        )
    }
    const registeredAlert = () => {
        return (
            <div class="alertGreen">
                <strong>You have been registered!</strong>
            </div>
        )
    }
    const usernameTakenAlert = () => {
        return (
            <div class="alert">
                <strong>Username already belongs to a user!</strong>
            </div>
        )
    }
    const passwordTooWeekAlert = () => {
        return (
            <div class="alert">
                <strong>Password too weak, make it larger!</strong>
            </div>
        )
    }

    const handleRegisterSumbit = async (event) => {
        event.preventDefault()
        fetch(`${API_URL}users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: `${firstName}`,
                lastName: `${lastName}`,
                email: `${emailReg}`,
                password: `${passwordReg}`
            })
        }).then(response => response.json())
            .then(result => {
                if (result.name === "PasswordLengthError") {
                    setWeakPass(true)
                }

                if (result.message === "you're signed up!") {
                    setRegistered(true)
                }

                if (result.name === 'UserExistsError') {
                    setUserNameTaken(true)
                }
            })
            .catch(console.error)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const fetchLogin = async () => {
            await fetch(`${API_URL}users/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: `${email}`,
                    password: `${password}`

                })
            }).then(response => response.json())
                .then(result => {
                    if (result.token) {
                        setIsLoggedIn(true)
                        localStorage.setItem('token', result.token);
                        setToken(result.token)
                        setUser(result.data);
                        console.log(result.data)
                    }
                    if (result.name === 'IncorrectCredentialsError') {
                        setValidInfo(false)
                    }
                })
                .catch(console.error);
        }
        fetchLogin()
    }

    return (
        <>
            <div className="containerModal" id="modal-opened">
                {!hideLogForm &&
                    <div className="modal">
                        <div className="details">
                            <h1 className="titleLog">Login</h1>
                        </div>
                        <p className="txt"></p>
                        <form onSubmit={handleSubmit} className="formContainer">
                            {isLoggedIn ?
                                <div className='container'>  {isLoggedIn && loggedInAlert()}</div>
                                : <div className="container"> {!validInfo && wrongUserAlert()}</div>}

                            <input type='text' placeholder="Email" value={email} onChange={handleChangeEmail} className="inputLogin"></input>
                            <input type='password' placeholder="Password" value={password} onChange={handleChangePassword} className="inputLogin"></input>
                            <button type="submit" className="btnModal">Log In &rarr;</button>
                        </form>
                        <button onClick={() => btnClicked()} className="link-2"></button>
                        <div className='memberDetail'>
                            <p className="signUpContainer">Not a member?</p><p onClick={() => registerPage()} className="signUp">Sign Up</p>
                        </div>
                    </div>
                }
                {register &&
                    <div className="modal">
                        <div className="details">
                            <h1 className="titleLog">Register</h1>
                        </div>
                        <p className="txt"></p>
                        <form onSubmit={handleRegisterSumbit} className="formContainer">
                            {userNameTaken && <div className="container">{usernameTakenAlert()}</div>}
                            {weakPass && <div className="container">{passwordTooWeekAlert()}</div>}
                            {registered && <div className="container">{registeredAlert()}</div>}
                            <div className='names'>
                                <input type='text' placeholder="First Name" value={firstName} onChange={handleChangeFirstName} className="inputLogin"></input>
                                <input type='text' placeholder="Last Name" value={lastName} onChange={handleChangeLastName} className="inputLogin"></input>
                            </div>

                            <input type='text' placeholder="Email" value={emailReg} onChange={handleChangeEmailReg} className="inputLogin"></input>
                            <input type='password' placeholder="Password" value={passwordReg} onChange={handleChangePasswordRegister} className="inputLogin"></input>
                            <button type="submit" className="btnModal">Register &rarr;</button>
                        </form>
                        <button onClick={() => btnClicked()} className="link-2"></button>
                        <div className='memberDetail'>
                            <p className="signUpContainer">Have an account?</p><p onClick={() => registerPage()} className="signUp">Log In</p>
                        </div>
                    </div>
                }
            </div>

        </>
    )
}

export default Login
