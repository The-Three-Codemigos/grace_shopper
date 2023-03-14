import React, { useEffect, useState } from 'react';
import Header from './Header';
import './style/Product.css'


const Products = ({ API_URL }) => {
    const [products, setProducts] = useState([]);
    const [value, setValue] = useState(100);

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


    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div>
            <Header />
            <div className='product-card'>

                <section className='subHeader'>
                    <div className='searchBar sub'></div>

                    <select className='sort sub'>
                        <option value="Phone">Phone</option>
                        <option value="Tablet">Tablet</option>
                        <option value="Watch">Watch</option>
                        <option value="Laptop">Laptop</option>
                    </select>
                    <div className='priceSlider sub'>Price Range
                        <div className="price-slider-container">
                            <input
                                type="range"
                                min="0"
                                max="1000"
                                step="10"
                                value={value}
                                onChange={handleChange}
                            />
                            <div className="price-slider-value">
                                <span>{value}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {products && products.map((product) => {
                    return (
                        <div className="card2" key={product.id}>
                            <div className='imgBox2'>
                                <img className='mouse' src={product.image} alt="" />
                            </div>
                            <div className='contentBox2'>
                                <h3>{product.title}</h3>
                                {/* <p>{product.description}</p> */}
                                <h2>${product.price}</h2>
                                <button className='buy2'>Add to Cart</button>
                            </div>
                        </div>
                    )
                })
                }

            </div>
        </div >
    )
}

export default Products;
