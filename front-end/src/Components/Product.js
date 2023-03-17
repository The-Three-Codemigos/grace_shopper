import React, { useEffect, useState } from 'react';
import Header from './Header';
import Pagination from './Pagination';
import './style/Product.css'
import addToCart from './addToCart';

const Products = ({ API_URL, user, token }) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(8);
    const [mySearch, setMySearch] = useState(null)

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

    // const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const handleTitleSearch = (event) => {
        setMySearch(event.target.value.toLowerCase());
    }

    const filteredProducts = products.filter(product => !mySearch || product.title.toLowerCase().includes(mySearch));

    const paginate = (e, pageNumber) => {
        e.preventDefault();
        setCurrentPage(pageNumber);
    }

    return (
        <div>
            <Header />
            <div className='product-card'>

                <section className='subHeader'>
                    <input className='searchBar' type='text' placeholder='Search... ' onChange={handleTitleSearch}></input>

                </section>

                {filteredProducts && filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct).map((product) => {
                    return (
                        <div className="card2" key={product.id}>
                            <div className='imgBox2'>
                                <img className='mouse' src={product.image} alt="" />
                            </div>
                            <div className='contentBox2'>
                                <h3>{product.title}</h3>
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
                <Pagination productsPerPage={productsPerPage} totalProducts={filteredProducts.length} paginate={paginate} />
            </div>
            <br></br>
        </div >
    )
}

export default Products;
