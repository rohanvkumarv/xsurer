"use client"

import { useUser } from "@clerk/nextjs"
import axios from "axios"
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const page = () => {
    const { user } = useUser()
    const { id } = useParams()
    const [data, setData] = useState({} as any)
    const [orderId, setOrderId] = useState("")
    const [amount, setAmount] = useState(0)
    useEffect(() => {
        const getPreview = async () => {
            const res = await axios.post("/api/getpreview", { id })
            if (res) {
                console.log(res.data.price)
                setData(res.data)
                setAmount(res.data.price)
            }
        }
        const getOrderId = async () => {
            const res = await axios.post("/api/payment", { amount })
            if (res) {
                console.log(res)
                setOrderId(res.data)
            }
        }
        getPreview()
        getOrderId()
    }, [])
    return (
        <div className='h-full flex items-center justify-center flex-col gap-4'>
            <div>
                {data.type === "image" ? (
                    <img src={data.url} alt="img" className='w-[300px] h-[300px]' />
                ) : (
                    <audio src={data.url} controls={true}></audio>
                )}
            </div>
            <form method="POST" action="https://api.razorpay.com/v1/checkout/embedded">
                <input type="hidden" name="key_id" value={process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID} />
                <input type="hidden" name="amount" value={data.price} />
                <input type="hidden" name="order_id" value={orderId} />
                <input type="hidden" name="name" value="Freelance Assurity" />
                <input type="hidden" name="description" value="Preview Download" />
                <input type="hidden" name="image" value="https://cdn.razorpay.com/logos/BUVwvgaqVByGp2_large.jpg" />
                <input type="hidden" name="prefill[name]" value={user?.firstName!} />
                <input type="hidden" name="prefill[contact]" value="9123456780" />
                <input type="hidden" name="prefill[email]" value="gaurav.kumar@example.com" />
                <input type="hidden" name="notes[shipping address]" value="L-16, The Business Centre, 61 Wellfield Road, New Delhi - 110001" />
                <input type="hidden" name="callback_url" value="/dashboard/preview/success" />
                <input type="hidden" name="cancel_url" value="/dashboard/preview/cancel" />
                <button>Pay Now</button>
            </form>
        </div>
    )
}

export default page