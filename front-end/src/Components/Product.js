import React, { useEffect, useState } from 'react';
import Header from './Header';
import Pagination from './Pagination';
import './style/Product.css'
import addToCart from './addToCart';


const Products = ({ API_URL, user, token }) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(8);
    // const [currProductId, setCurrProductId] = useState(null)

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

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (e, pageNumber) => {
        e.preventDefault();
        setCurrentPage(pageNumber);
    }

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

                {currentProducts && currentProducts.map((product) => {
                    return (
                        <div className="card2" key={product.id}>
                            {/* {setCurrProductId(product.id)} */}
                            <div className='imgBox2'>
                                <img className='mouse' src={product.image} alt="" />
                            </div>
                            <div className='contentBox2'>
                                <h3>{product.title}</h3>
                                {/* <p>{product.description}</p> */}
                                <h2>${product.price}</h2>
                                <button className='buy2' onClick={() => addToCart(API_URL, user, product.id, token)}>Add to Cart</button>
                            </div>
                        </div>
                    )
                })
                }
            </div>
            <br></br>
            <div className='pagination-container'>
                <Pagination productsPerPage={productsPerPage} totalProducts={products.length} paginate={paginate} />
            </div>
            <br></br>
        </div >
    )
}

export default Products;
