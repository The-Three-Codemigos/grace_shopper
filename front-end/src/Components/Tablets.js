
const Tablet = () => {
    return <>
        <div className="card">
            <div className="imgBox">
                <img src="https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP708/SP708-space_gray.jpeg" alt="mouse corsair" className="mouse" />
            </div>
            <div className="contentBox">
                <h3>iPad Air 2nd Generation</h3>
                <h2 className="price">$600.<small>00</small> </h2>
                <button href="#" className="buy">Add to cart</button>

            </div>
        </div>
        <div className="card">
            <div className="imgBox">
                <img src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-ipad-air-wifi-green-2021?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1644268592092" alt="mouse corsair" className="mouse" />
            </div>
            <div className="contentBox">
                <h3>iPad Air 4th Generation</h3>
                <h2 className="price">$699.<small>00</small></h2>
                <button href="#" className="buy">Add to cart</button>
            </div>
        </div>
        <div className="card">
            <div className="imgBox">
                <img src="https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP784/ipad-pro-11-2018_2x.png" alt="mouse corsair" className="mouse" />
            </div>
            <div className="contentBox">
                <h3>iPad Pro</h3>
                <h2 className="price">$699.<small>00</small></h2>
                <button href="#" className="buy">Add to cart</button>
            </div>
        </div>
    </>
}

export default Tablet