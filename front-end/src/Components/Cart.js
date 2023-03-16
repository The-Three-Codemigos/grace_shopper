import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './style/Cart.css'

const Cart = ({ API_URL, token, setToken, setUser }) => {
    const [myCart, setMyCart] = useState([])
    const [products, setProducts] = useState([])
    let sum = 0;


    const getOrders = async () => {
        try {
            const response = await fetch(`${API_URL}orders/myOrders`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();
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
    }, [token]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const myProductData = await Promise.all(
                    myCart && myCart.map((product) =>
                        fetch(`${API_URL}products/${product.product_id}`)
                            .then((response) => response.json())
                            .catch((error) => console.error(error))
                    )
                );
                setProducts(myProductData.flat());
            } catch (error) {
                console.error(error);
            }
        };
        getProducts();
    }, [myCart]);

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
                        {products && products.map((data) =>
                            <div className="card2 cartCard" key={data.id}>
                                <p className='totalPriceP'>{sum += parseFloat(data.price)}</p>

                                <button className='removeBtn'>X</button>
                                <div className='imgBox2'>
                                    <img className='mouse' src={data.image} alt="" />
                                </div>
                                <div className='contentBox2'>
                                    <h3>{data.title}</h3>
                                    <h2>${data.price}</h2>
                                </div>
                            </div>
                        )}
                        <h1 className='totalPrice'>Total ${sum}</h1>
                    </section>
                </div>
            </section>
        </body>
    )
}

export default Cart
