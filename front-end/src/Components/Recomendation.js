import laptopImg from "./img/ipad.png"
import iphone from "./img/iphone.png"
import watch from "./img/watch.png"
const Recomendation = () => {
    return <>
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
    </>
}

export default Recomendation