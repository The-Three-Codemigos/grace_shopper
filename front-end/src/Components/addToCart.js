
const addToCart = async (API_URL, user, product_Id, token) => {
    let order = []
    let items = []
    try {
        await fetch(`${API_URL}orders`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                user_id: `${user.id}`,
            })
        }).then((response) => response.json())
            .then((result) =>
                order = result
            )
        console.log(order)
        if (order) {
            await fetch(`${API_URL}order-items/${product_Id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    orderId: `${order.id}`,
                    product_id: `${product_Id}`,
                    quantity: 1
                })
            }).then((response) => response.json())
                .then((result) =>
                    items = result
                )
            if (items) {
                alert("Product added to cart!");
            }
            console.log(items)
        }

    }

    catch (err) {
        console.error(err)
    }
}
export default addToCart
