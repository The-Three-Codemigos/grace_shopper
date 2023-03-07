import React from 'react';
import Header from './Header';
import './style/Home.css'
import iphoneImg from "./img/iphone4.png"


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
                        {/* <p>image</p> */}
                        {/* <div className='iphoneImage'></div> */}
                        <img className='iphoneImage' src={iphoneImg} alt="iPhone" />
                    </div>
                </section>
            </main>
        </>
    )
}

export default Home
