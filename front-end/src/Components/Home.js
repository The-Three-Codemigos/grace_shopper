import React from 'react';
import Header from './Header';
import './style/Home.css'
// import iphoneImg from "./img/iphone5.png"
import laptopImg from "./img/ipad.png"
import iphone from "./img/iphone.png"
import watch from "./img/watch.png"
// import mac from "./img/mac.png"

const Home = () => {
    return (
        <>
            <Header />
            <main>
                <section className='landingPageSec'>
                    <div className='sloganSec'>
                        <p className='slogan1'>Powered</p>
                        <p className='slogan2'>By Intellect</p>
                        <p className='slogan3'>Driven By Values</p>
                        <div className='buyNowBtnSec'>
                            <button className='buyNowBtn'>Buy Now</button>
                            <p className='learnLink'>Learn More</p>
                        </div>
                    </div>
                    <div className='landingImg'>
                        <img className='iphoneImage' src={iphone} alt="iPhone" />
                    </div>
                </section>
                <section className='newPromosSec'>

                    <p className='titlePromo'>New Promos</p>

                    <ul className='promosLink'>
                        <li><button className='promoBtn' autoFocus>Recomendations</button></li>
                        <li><button className='promoBtn'>Mobile</button></li>
                        <li><button className='promoBtn'>Tablets</button></li>
                        <li><button className='promoBtn'>Laptop</button></li>
                        <li><button className='promoBtn'>Watches</button></li>
                    </ul>

                    <section className='promoProducts'>

                        <div class="card">
                            <div class="imgBox">
                                <img src={laptopImg} alt="mouse corsair" class="mouse" />
                            </div>
                            <div class="contentBox">
                                <h3>Product name</h3>
                                <h2 class="price">$61.<small>98</small> </h2>
                                <button href="#" className="buy">Add to cart</button>

                            </div>
                        </div>
                        <div class="card">
                            <div class="imgBox">
                                <img src={watch} alt="mouse corsair" class="mouse" />
                            </div>
                            <div class="contentBox">
                                <h3>Product name</h3>
                                <h2 class="price">$61.<small>98</small></h2>
                                <button href="#" className="buy">Add to cart</button>
                            </div>
                        </div>
                        <div class="card">
                            <div class="imgBox">
                                <img src={iphone} alt="mouse corsair" class="mouse" />
                            </div>
                            <div class="contentBox">
                                <h3>Product name</h3>
                                <h2 class="price">$61.<small>98</small></h2>
                                <button href="#" className="buy">Add to cart</button>
                            </div>
                        </div>
                    </section>
                </section>
            </main>
        </>
    )
}

export default Home
