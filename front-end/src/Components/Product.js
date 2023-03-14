import React, { useEffect, useState } from 'react';
import Header from './Header';
import Pagination from './Pagination';
import './style/Product.css'


const Products = ({ API_URL }) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(8);
    
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

    const paginate = (event, pageNumber) => {
        event.preventdefault();
        setCurrentPage(pageNumber);
    }

        return (
            <div>
                <Header />                
                <div className='product-card'>
                { currentProducts && currentProducts.map((product) => {
                    return (
                        <div className='card' key={product.id}>
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
                <br></br>

                <div className='pagination-container'>
                    <Pagination productsPerPage={productsPerPage} totalProducts={products.length} paginate={paginate} />
                </div>
            </div>
    )
}

export default Products;
