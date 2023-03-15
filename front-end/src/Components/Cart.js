import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './style/Cart.css'


const Cart = ({ API_URL, token }) => {
    const [orderList, setOrderList] = useState([])
    const [myItems, setMyItems] = useState([])
    const [myCart, setMyCart] = useState([])
    const [error, setError] = useState(null);

    // All orders but not myOrders need to fix that issue

    useEffect(() => {
        getOrders()
        getItems()
    }, []);
    console.log(orderList)
    console.log(myItems)


    const getOrders = async () => {
        try {
            const response = await fetch(`${API_URL}/orders/myOrders`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            setOrderList(data);
        } catch (error) {
            console.error(error);
            setError("An error occurred while fetching orders. Please try again later.");
        }
    }

    const getItems = async () => {
        try {
            await fetch(`${API_URL}/order-items`)
                .then((response) => response.json())
                .then((data) => {
                    setMyItems(data)
                })
                .catch((error) => console.error(error));
        } catch (error) {
            console.error(error);
        }
    }

    // const showMyCart = () => {

    // }


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
                        {/* Map goes here */}
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
                    {error && <div className="error">{error}</div>}
                </div>
            </section>
        </body>
    )
}

export default Cart
