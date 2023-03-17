import React, { useState, useEffect } from "react";
import Header from "./Header";
import "./style/Profile.css";

const Admin = ({ API_URL }) => {
    const [users, setUsers] = useState([]);


    const fetchAllUsers = async () => {
        try {
            const response = await fetch(`${API_URL}users`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            console.log(result);
            if (result) {
                setUsers(result);
            }
            return result;
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);
    console.log(users)

    return (
        <>
            <Header />
            {/* <section className="usersInfo">
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
                                        user
                                    }) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>

                                            <td>{user.firstName}</td>

                                            <td>{user.lastName}</td>

                                            <td>{user.email}</td>

                                            <td>{user.isadmin}</td>
                                        </tr>
                                    )
                                )}
                        </tbody>
                    </table>
                </div>
            </section> */}
        </>
    );
};

export default Admin;
