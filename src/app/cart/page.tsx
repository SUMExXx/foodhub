'use client'
import React, { useState, useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';
import { useStateContext } from '../context/stateContext';
import { auth } from '../context/firebase';
import { userRoutes } from '@/data/apiRoutes';
import CartItem from '../components/CartItem';
import { useRouter } from 'next/navigation';

import { makePayment } from '@/payment/razorpay';

interface CartProps{
    pid: string,
    name: string,
    desc: string,
    price: number,
    type: string,
    qty: number,
    imgUrl: string
}

const Cart = () =>{

    const router = useRouter()

    const { authentication, setAuthentication, cartRefresh, setCartRefresh } = useStateContext();

    const [cartData, setCartData] = useState<CartProps[] | null>(null)

    const [total, setTotal] = useState(0)

    const [Id, setId] = useState<string | null>(null);

    const id = authentication?.currentUser?.uid

    const getTotal = () => {
        var totalPrice = 0
        cartData?.forEach((cartItem) => {
            totalPrice = totalPrice + (cartItem.price * cartItem.qty)
        })
        setTotal(totalPrice)
    }

    const placeOrder = async () => {
        // await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${userRoutes.placeOrder}`, {
        //     method: 'POST',
        //     headers: {
        //     'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ uuid: id }),
        // })
        // .then((res) => {
        //     if(res.ok){
        //         alert('Yeah! Order placed')
        //         setCartRefresh((prev) => !prev)
        //         router.push('/')
        //     }
        // })
        // .catch((error) => {
        //     console.error('Error fetching cart data:', error);
        // });
        
        if(id){
            makePayment(id);
        }
    }
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setId(user.uid);
            } else {
                setId(null);
            }
        });

        if (id) {
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${userRoutes.getCart}`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uuid: id }),
            })
            .then((res) => res.json())
            .then((data) => {
                setCartData(data);
                getTotal()
            })
            .catch((error) => {
                console.error('Error fetching cart data:', error);
            });
        }

        return () => unsubscribe();
    }, [id, cartRefresh, cartData]);

    return(
        cartData == null? (
            <div className='w-full md:min-h-[600px] flex justify-center items-center md:gap-4'>
                <div className="w-12 h-12 border-4 border-customRed border-dashed rounded-full animate-spin"></div>
                <div className='text-2xl'>Loading Cart...</div>
            </div>
        ) : (
            cartData.length == 0? (
                <div className='flex flex-col justify-center items-center text-center w-full md:min-h-[600px]'>
                    <h1 className='text-4xl'>Uh...Oh! Nothing in cart!</h1>
                    <h1 className='text-4xl'>Don&apos;t Worry, head over to</h1>
                    <Link href={'/menu'} className='text-4xl text-customRed font-bold'>Menu</Link>
                    <h1 className='text-4xl'>and explore a variety of</h1>
                    <h1 className='text-4xl'> our delicacies to add to your cart!</h1>
                </div>
            ) : (
                <div className='flex flex-col justify-start items-center md:px-8 md:py-12 md:min-h-[600px]'>
                    <div className='flex md:gap-4 justify-center items-start'>
                        <div className='flex flex-col justify-start items-center md:p-2 md:gap-4 w-[600px] rounded-lg'>
                            <div className='flex justify-start items-center w-full md:px-6 text-left font-bold'>CART ITEMS</div>
                            {
                                cartData?.length == 0? <></> : (
                                    cartData?.map((item) => (
                                        <CartItem key={item.pid} name={item.name} pid={item.pid} price={item.price} type={item.type} desc={item.desc} qty={item.qty} imgUrl={item.imgUrl}/>
                                    ))
                                )
                            }
                        </div>
                        <div className='flex flex-col justify-start items-center md:gap-2 w-[400px] outline outline-customLightRed outline-1 rounded-lg md:p-8'>
                            <div className='w-full text-left font-bold text-sm md:pb-2'>
                                BILL DETAILS
                            </div>
                            <div className='flex justify-between w-full'>
                                <span>Item Total</span>
                                <span>{`₹ ${total}`}</span>
                            </div>
                            <div className='w-full border-t border-customLightRed md:my-2'/>
                            <div className='flex justify-between w-full'>
                                <span>Delivery Fee</span>
                                <span>{`₹ 40`}</span>
                            </div>
                            <div className='w-full border-t border-customLightRed md:my-2'/>
                            <div className='flex justify-between w-full'>
                                <span>Platform Fee</span>
                                <span>{`₹ 5`}</span>
                            </div>
                            <div className='flex justify-between w-full'>
                                <span>GST & Restaurant Charges</span>
                                <span>{`₹ 98.50`}</span>
                            </div>
                            <div className='w-full border-t-2 border-black md:my-2'/>
                            <div className='flex justify-between w-full'>
                                <span className='text-lg font-bold text-green-700'>TO PAY</span>
                                <span className='text-lg font-bold'>{`₹ ${total+40+5+98.50}`}</span>
                            </div>
                            <div className='w-full md:pt-4'>
                                <button className='rounded-md bg-green-700 text-white font-bold w-full md:p-2' onClick={placeOrder}>
                                    PLACE ORDER
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        )
    )
}

export default Cart