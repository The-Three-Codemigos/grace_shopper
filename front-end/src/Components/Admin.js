import React, { useState, useEffect } from "react";
import Header from "./Header";
import "./style/Profile.css";

const Admin = ({ API_URL }) => {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);

    const fetchAllUsers = async () => {
        try {
            const response = await fetch(`${API_URL}users`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();

            if (result) {
                setUsers(result);
            }
            return result;
        } catch (error) {
            console.error(error);
        }
    };

    const getProducts = async () => {
        try {
            const response = await fetch(`${API_URL}products`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            if (result) {
                setProducts(result);
            }
            return result;
        } catch (error) {
            console.error(error);
        }
    };

    const removeProduct = async (product_id) => {
        try {
            const response = await fetch(`${API_URL}products/${product_id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            if (result) {
                setProducts(result);
            }
            return result;
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    });

    useEffect(() => {
        getProducts();
    });

    return (
        <>
            <Header />
            <section className="usersInfo">
                <h2>User Info</h2>
                <table className="table">
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
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </section>

            <section className="usersInfo">
                <h2>Product Info</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Product Id</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Category</th>
                            {/* <th>Image</th> */}
                            <th>Remove Product</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products &&
                            products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.title}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    {/* <td>{product.image}</td> */}
                                    <td>
                                        <button
                                            className="remove-product"
                                            id="x"
                                            onClick={() => {
                                                removeProduct(product.id);
                                            }}
                                        >
                                            X
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default Admin;
