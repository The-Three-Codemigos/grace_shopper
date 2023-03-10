import React, { useEffect, useState } from 'react';
import Header from './Header';
import './style/Product.css'


const Products = ({ API_URL }) => {
    const [products, setProducts] = useState([]);

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

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div>
            <Header />
            <div className='product-card'>
                {products && products.map((product) => {
                    return (
                        <div className="card2" key={product.id}>
                            <div className='imgBox'>
                                <img className='mouse' src="https://loremflickr.com/320/240" alt="" />
                            </div>
                            <div className='contentBox'>
                                <h3>{product.title}</h3>
                                {/* <p>{product.description}</p> */}
                                <h2>${product.price}</h2>
                                <button className='buy'>Add to Cart</button>
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}

export default Products;
