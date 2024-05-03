"use client"

import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"
import axios from "axios"
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from "react-hot-toast"
import Razorpay from "razorpay"

const page = () => {
    const { user } = useUser()
    const { id } = useParams()
    const [data, setData] = useState({} as any)
    const [orderId, setOrderId] = useState("")
    const [amount, setAmount] = useState(0)
    useEffect(() => {
        const getPreview = async () => {
            const response = await axios.post("/api/getpreview", { id })
            if (response) {
                console.log(response.data.price)
                setData(response.data)
                const res = await axios.post("/api/payment", { amount: response.data.price })
                if (res) {
                    console.log(res)
                    setOrderId(res.data.id)
                    setAmount(res.data.amount)
                    console.log("After everything server : " + res.data.amount)
                    console.log("After everything : " + amount)
                }
            }
        }
        getPreview()
    }, [])
    const options = {
        "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        "amount": amount,
        "currency": "INR",
        "name": "Acme Corp",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": orderId,
        "prefill": {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9000090000"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    const processPayment = () => {
        const razor = new window.Razorpay(options)
        razor.open()
        razor.on('payment.success', () => {
            toast.success("Payment Successful")
        })
    }
    return (
        <div className='h-full flex items-center justify-center flex-col gap-4'>
            <div>
                {data.type === "image" ? (
                    <img src={data.url} alt="img" className='w-[300px] h-[300px]' />
                ) : (
                    <audio src={data.url} controls={true}></audio>
                )}
            </div>
            <Button onClick={processPayment}>Pay Now</Button>
        </div>
    )
}

export default page