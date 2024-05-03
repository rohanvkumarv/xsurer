import { NextResponse } from "next/server"
import Razorpay from "razorpay"

export const POST = async (req: Request) => {
    try {
        const { amount } = await req.json();
        const price = amount * 100
        const instance = new Razorpay({ key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!, key_secret: process.env.NEXT_PUBLIC_RAZORPAY_SECRET_KEY })
        const orders = await instance.orders.create({
            "amount": price,
            "currency": "INR",
            "receipt": "receipt#1",
            "partial_payment": false,
            "notes": {
                "key1": "value3",
                "key2": "value2"
            }
        })
        return new NextResponse(JSON.stringify(orders))
    } catch (error) {
        console.error(error)
        return new NextResponse(JSON.stringify(error))
    }
}