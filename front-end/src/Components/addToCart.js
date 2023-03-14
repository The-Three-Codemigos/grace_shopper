import React, { useState } from 'react';


const addToCart = async (API_URL, user, product_Id, token) => {
    console.log(product_Id)
    console.log(token)
    console.log(user)

    let order = []
    let items = []

    try {
        const orders = await fetch(`${API_URL}orders`, {
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
            console.log("Ordere correct")
            const item = await fetch(`${API_URL}order-items/${product_Id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    orderId: `${order.id}`,
                    product_id: `${product_Id}`,
                    quantity: 2
                })
            }).then((response) => response.json())
                .then((result) =>
                    items = result
                )
            console.log(items)
        }

    }

    catch (err) {
        console.error(err)
    }
}
export default addToCart
