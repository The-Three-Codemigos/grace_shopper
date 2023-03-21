import React, { useState } from "react";
import Header from './Header';
import './style/Home.css'
import iphone from "./img/iphone.png"
import Recomendation from "./Recomendation";
import Laptop from "./Laptop";
import Tablet from "./Tablets";
import Mobile from "./Mobile";
import Watch from "./Watch";

const Home = ({ isLoggedIn }) => {
    const [clicked, setClicked] = useState(false)
    const [recomendationClicked, setRecomendationClicked] = useState(true)
    const [mobileClicked, setMobileClicked] = useState(false)
    const [tabletClicked, setTabletClicked] = useState(false)
    const [watchClicked, setWatchClicked] = useState(false)
    const [laptopClicked, setLaptopClicked] = useState(false)

    const clickedBtn = document.getElementById("focusedLink")
    if (clicked) {
        clickedBtn.classList.remove("focusedLink")
    }
    const handleMobileBtn = () => {
        setClicked(true)
        setMobileClicked(true)
        setTabletClicked(false)
        setLaptopClicked(false)
        setWatchClicked(false)
        setRecomendationClicked(false)
    }

    const handleRecomendationBtn = () => {
        setClicked(false)
        setMobileClicked(false)
        setTabletClicked(false)
        setLaptopClicked(false)
        setWatchClicked(false)
        setRecomendationClicked(true)
    }
    const handleTabletBtn = () => {
        setClicked(true)
        setTabletClicked(true)
        setMobileClicked(false)
        setLaptopClicked(false)
        setWatchClicked(false)
        setRecomendationClicked(false)
    }
    const handleLaptopBtn = () => {
        setClicked(true)
        setMobileClicked(false)
        setTabletClicked(false)
        setLaptopClicked(true)
        setWatchClicked(false)
        setRecomendationClicked(false)
    }
    const handleWatchBtn = () => {
        setClicked(true)
        setMobileClicked(false)
        setTabletClicked(false)
        setLaptopClicked(false)
        setWatchClicked(true)
        setRecomendationClicked(false)
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
                        <li><button className='promoBtn focusedLink' id="focusedLink" onClick={() => handleRecomendationBtn()} >Recomendations</button></li>
                        <li><button className='promoBtn' onClick={() => handleMobileBtn()} >Mobile</button></li>
                        <li><button className='promoBtn' onClick={() => handleTabletBtn()}>Tablets</button></li>
                        <li><button className='promoBtn' onClick={() => handleLaptopBtn()}>Laptop</button></li>
                        <li><button className='promoBtn' onClick={() => handleWatchBtn()}>Watches</button></li>
                    </ul>

                    <section className='promoProducts'>
                        {recomendationClicked && <Recomendation />}
                        {mobileClicked && <Mobile />}
                        {tabletClicked && <Tablet />}
                        {watchClicked && <Watch />}
                        {laptopClicked && <Laptop />}
                    </section>
                </section>
            </main>
        </>
    )
}

export default Home
