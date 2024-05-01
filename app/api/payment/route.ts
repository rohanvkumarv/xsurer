import { NextResponse } from "next/server"
import Razorpay from "razorpay"

export const POST = async (req: Request) => {
    try {
        const { amount } = await req.json();
        console.log("Amount is: " + amount)
        const instance = new Razorpay({ key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!, key_secret: process.env.NEXT_PUBLIC_RAZORPAY_SECRET_KEY })
        let id = ""
        await instance.orders.create({
            "amount": "50000",
            "currency": "INR",
            "receipt": "receipt#1",
            "partial_payment": false,
            "notes": {
                "key1": "value3",
                "key2": "value2"
            }
        }, (err, order) => {
            if (err) {
                console.error(err)
            }
            id = order.id
            console.log(order.id)
        })
        return new NextResponse(JSON.stringify(id))
    } catch (error) {
        console.error(error)
    }
}