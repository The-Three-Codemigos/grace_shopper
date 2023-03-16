import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './style/Cart.css'

const Cart = ({ API_URL, token, setToken, setUser }) => {
    const [orderList, setOrderList] = useState([])
    // const [myItems, setMyItems] = useState([])
    const [myCart, setMyCart] = useState([])
    console.log("MY CART: ", myCart)


    const getOrders = async () => {
        try {
            const response = await fetch(`${API_URL}orders/myOrders`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            // setOrderList(() => data);
            if (data) {
                const myCartData = await Promise.all(
                    data && data.map((order) =>
                        fetch(`${API_URL}order-items/${order.id}`)
                            .then((response) => response.json())
                            .catch((error) => console.error(error))
                    )
                );
                setMyCart(myCartData.flat());
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getOrders()
        // getMyCart()
    }, [token]);

    return (
        <body className='cartBody'>
            <Header />
            <section className='cartSection'>
                <div className='subHeaderCart'>
                    <h1>RESPONSIVE TABLE SHOPPING CART</h1>
                    <section className='CartBtnContainer'>
                        <p>My Cart</p>
                        <Link to='/products'>
                            <button>Continue Shoping</button>
                        </Link>
                    </section>

                    <section className='productsSec'>
                        {/* {myCart.map((cart) => {

                        })} */}
                        <div className='productCart'>
                            <div className='productCartLeft'>
                                <h3>Product Name</h3>
                                <div className='productPriceSec'>
                                    <input type="number" value={1}></input>
                                    <p>X</p>
                                    <p>$15</p>
                                </div>

                            </div>
                            <div className='productCartRight'>
                                <p>$15</p>
                                <button>X</button>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </body>
    )
}

export default Cart
