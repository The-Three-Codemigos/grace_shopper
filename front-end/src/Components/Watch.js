import laptopImg from "./img/ipad.png"
import iphone from "./img/iphone.png"
import watch from "./img/watch.png"
const Watch = () => {
    return <>
        <div className="card">
            <div className="imgBox">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Apple_Watch_%28Space_Grey_42mm%29.png" alt="mouse corsair" className="mouse" />
            </div>
            <div className="contentBox">
                <h3>AppleWatch</h3>
                <h2 className="price">$599.<small>98</small> </h2>
                <button href="#" className="buy">Add to cart</button>

            </div>
        </div>
        <div className="card">
            <div className="imgBox">
                <img src="https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP746/alu-spacegray-nike.jpg" alt="mouse corsair" className="mouse" />
            </div>
            <div className="contentBox">
                <h3>AppleWatch Series 2</h3>
                <h2 className="price">$649.<small>98</small></h2>
                <button href="#" className="buy">Add to cart</button>
            </div>
        </div>
        <div className="card">
            <div className="imgBox">
                <img src="https://www.apple.com/newsroom/images/product/watch/standard/apple-watch-series4_gold-milanese_09122018_carousel.jpg.large_2x.jpg" alt="mouse corsair" className="mouse" />
            </div>
            <div className="contentBox">
                <h3>AppleWatch Series 4</h3>
                <h2 className="price">$799.<small>98</small></h2>
                <button href="#" className="buy">Add to cart</button>
            </div>
        </div>
    </>
}

export default Watch