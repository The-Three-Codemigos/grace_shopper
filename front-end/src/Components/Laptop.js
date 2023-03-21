import laptopImg from "./img/ipad.png"
import iphone from "./img/iphone.png"
import watch from "./img/watch.png"
const Laptop = () => {
    return <>
        <div className="card">
            <div className="imgBox">
                <img src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spacegray-select-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1671304673202" alt="mouse corsair" className="mouse" />
            </div>
            <div className="contentBox">
                <h3>MacBook Pro 13in</h3>
                <h2 className="price">$999.<small>00</small> </h2>
                <button href="#" className="buy">Add to cart</button>

            </div>
        </div>
        <div className="card">
            <div className="imgBox">
                <img src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665" alt="mouse corsair" className="mouse" />
            </div>
            <div className="contentBox">
                <h3>MacBook Air M2</h3>
                <h2 className="price">$1249.<small>00</small></h2>
                <button href="#" className="buy">Add to cart</button>
            </div>
        </div>
        <div className="card">
            <div className="imgBox">
                <img src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-space-gray-select-201810?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1664472289661" alt="mouse corsair" className="mouse" />
            </div>
            <div className="contentBox">
                <h3>MacBook Air M1</h3>
                <h2 className="price">$1199.<small>00</small></h2>
                <button href="#" className="buy">Add to cart</button>
            </div>
        </div>
    </>
}

export default Laptop