import laptopImg from "./img/ipad.png"
import iphone from "./img/iphone.png"
import watch from "./img/watch.png"
const Mobile = () => {
    return <>
        <div className="card">
            <div className="imgBox">
                <img src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-finish-select-202207-5-4inch_AV1?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1671463394187" alt="mouse corsair" className="mouse" />
            </div>
            <div className="contentBox">
                <h3>iPhone 13 mini</h3>
                <h2 className="price">$599.<small>00</small> </h2>
                <button href="#" className="buy">Add to cart</button>

            </div>
        </div>
        <div className="card">
            <div className="imgBox">
                <img src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-yellow?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1676505836714" alt="mouse corsair" className="mouse" />
            </div>
            <div className="contentBox">
                <h3>iPhone 14</h3>
                <h2 className="price">$799.<small>00</small></h2>
                <button href="#" className="buy">Add to cart</button>
            </div>
        </div>
        <div className="card">
            <div className="imgBox">
                <img src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-finish-unselect-gallery-3-202207_GEO_US?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1662128988137" alt="mouse corsair" className="mouse" />
            </div>
            <div className="contentBox">
                <h3>iPhone 12 mini</h3>
                <h2 className="price">$499.<small>00</small></h2>
                <button href="#" className="buy">Add to cart</button>
            </div>
        </div>
    </>
}

export default Mobile