import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import "./style/Profile.css";

const Admin = ({ isLoggedIn, setIsLoggedIn, API_URL }) => {
  const [users, setUsers] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const btnClicked = () => {
    setShowLoginModal(!showLoginModal);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  async function fetchAllUsers() {
    try {
      const response = await fetch('${API_URL}user', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      setUsers(json);
    } catch (error) {
      console.error(error);
    }
  }




  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      {!isLoggedIn ? (
        <section className="loginSection">
          <h1>Administrators Only</h1>
          <p>Please fill out a job application</p>
          <button className="signInBtn" onClick={() => btnClicked()}>
            Sign In
          </button>
          {showLoginModal && (
            <Login
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              API_URL={API_URL}
              showLoginModal={showLoginModal}
              setShowLoginModal={setShowLoginModal}
            />
          )}
        </section>
      ) : 
      (
        <section className="usersInfo">
          <h1>All Users</h1>
          <div className="main">
        <div className="title">Admin Board</div>
        <table className="table">
          <caption>User Information</caption>
          <thead>
            <tr>
              <th>User Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map(
                ({
                  id,
                  firstName,
                  lastName,
                  email,
                  isadmin,
                }) => (
                  <tr key={id}>
                    <td>{id}</td>

                    <td>{firstName}</td>

                    <td>{lastName}</td>

                    <td>{email}</td>

                    <td>{isadmin}</td>

                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>
        </section>
      )}
    </>
  );
};

export default Admin;
