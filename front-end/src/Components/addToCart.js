import React from 'react'

const addToCart = async (API_URL, user, productId) => {

    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: `${user.id}`
            })
        })
        console.log(response)
        if (response) {
            await fetch(`${API_URL}/orders/${productId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId: `${response.id}`,
                    product_id: `${productId}`,
                    quantity: 1
                })
            }).then((response) => response.json())
                .then((result) =>
                    console.log(result)
                )
        }
    }
    catch (err) {
        console.error(err)
    }


}
export default addToCart
