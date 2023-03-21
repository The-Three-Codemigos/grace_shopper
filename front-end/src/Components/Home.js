import React, { useEffect, useState } from "react";
import Header from './Header';
import './style/Home.css'
import laptopImg from "./img/ipad.png"
import iphone from "./img/iphone.png"
import watch from "./img/watch.png"

const Home = ({ isLoggedIn }) => {
    const [clicked, setClicked] = useState(false)


    const clickedBtn = document.getElementById("focusedLink")
    if (clicked) {
        clickedBtn.classList.remove("focusedLink")
    }

    const handleLinkBtn = () => {
        setClicked(true)
    }

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <main >
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

                    <p className='titlePromo' id="promo">New Promos</p>

                    <ul className='promosLink'>
                        <li><button className='promoBtn focusedLink' id="focusedLink" >Recomendations</button></li>
                        <li><button className='promoBtn' onClick={() => handleLinkBtn()} >Mobile</button></li>
                        <li><button className='promoBtn' onClick={() => handleLinkBtn()}>Tablets</button></li>
                        <li><button className='promoBtn' onClick={() => handleLinkBtn()}>Laptop</button></li>
                        <li><button className='promoBtn' onClick={() => handleLinkBtn()}>Watches</button></li>
                    </ul>

                    <section className='promoProducts'>

                        <div className="card">
                            <div className="imgBox">
                                <img src={laptopImg} alt="mouse corsair" className="mouse" />
                            </div>
                            <div className="contentBox">
                                <h3>Product name</h3>
                                <h2 className="price">$399.<small>98</small> </h2>
                                <button href="#" className="buy">Add to cart</button>

                            </div>
                        </div>
                        <div className="card">
                            <div className="imgBox">
                                <img src={watch} alt="mouse corsair" className="mouse" />
                            </div>
                            <div className="contentBox">
                                <h3>Product name</h3>
                                <h2 className="price">$249.<small>98</small></h2>
                                <button href="#" className="buy">Add to cart</button>
                            </div>
                        </div>
                        <div className="card">
                            <div className="imgBox">
                                <img src={iphone} alt="mouse corsair" className="mouse" />
                            </div>
                            <div className="contentBox">
                                <h3>Product name</h3>
                                <h2 className="price">$499.<small>98</small></h2>
                                <button href="#" className="buy">Add to cart</button>
                            </div>
                        </div>
                    </section>
                </section>
                {/* {isLoggedIn && <h1>You are logged in!</h1>} */}
            </main>
        </>
    )
}

export default Home
