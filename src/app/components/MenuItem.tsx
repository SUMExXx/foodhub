'use client';
import React, {useEffect, useState} from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { userRoutes } from '@/data/apiRoutes';
import { useStateContext } from '../context/stateContext';


interface MenuItemProps{
    pid: string,
    name: string,
    desc: string,
    price: number,
    type: string,
    imgUrl: string
}

const MenuItem = ({ pid, name, desc, price, type, imgUrl} : MenuItemProps) => {

    const {authentication, setAuthentication, cartRefresh, setCartRefresh} = useStateContext()

    const [quantity, setQuantity] = useState(0);

    const incrementQuantity = async () =>{
        if(authentication?.currentUser?.uid){
            if(quantity + 1 < 31){
                await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${userRoutes.addToCart}`,{
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({'uuid': authentication?.currentUser?.uid, 'pid': pid})
                }).then((res)=>{

                    setCartRefresh((prev) => !prev)

                    if(res.ok){
                        setQuantity((prev) => {
                            return prev + 1
                        } )
                    }
                })
            } else {
                alert('Cannot add more than 30 of the same item')
            }
        } else{
            alert("Login to add to cart")
        }
    }

    const decrementQuantity = async () =>{
        if(authentication?.currentUser?.uid){
            if(quantity - 1 >= 0){
                await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${userRoutes.deleteFromCart}`,{
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({'uuid': authentication?.currentUser?.uid, 'pid': pid})
                }).then((res)=>{

                    setCartRefresh((prev) => !prev)

                    if(res.ok){
                        setQuantity((prev) => {
                            return prev - 1
                        } )
                    }
                })
            }
        }else{
            alert("Login to add to cart")
        }
    }

    useEffect(() => {
        const fetchQuantity = async () =>{
            await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${userRoutes.getCart}`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({'uuid': authentication?.currentUser?.uid, 'pid': pid})
            }).then((res)=>{
                if(res.ok){
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return res.json();
                }
            }).then((data: Array<{pid: string, qty: number, name: string, desc: string, price: number, imgUrl: string, type: string}>) => {
                if(data){
                    data.forEach((item) => {
                        if(item.pid == pid){
                            setQuantity(item.qty)
                        }
                    })
                }
            })
        }

        fetchQuantity()
    }, [authentication, pid])

  return (
    <div className='rounded-xl shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] ease-in-out duration-300 cursor-pointer'>
        <div className='duration-0 flex justify-center md:w-[460px] md:max-h-[160px] md:gap-1 w-full'>
            <div className={`h-[160px] w-[160px] min-w-[160px] rounded-xl flex md:p-1 items-end justify-between`} style={{backgroundImage: `url(${imgUrl})`, objectFit: 'cover', backgroundSize: 'cover'}}>
                
            </div>
            <div className='flex flex-col md:p-4 justify-between items-center text-center md:gap-1 w-full h-full'>
                <div>
                    <div className='flex md:gap-1 w-full'>
                        <h4 className='text-sm font-black rounded-sm w-full text-left flex items-center min-h-[40px]' title={name}>{name}</h4>
                        <div className='flex flex-col items-end'>
                            <h4 className='text-sm rounded-sm text-right font-bold'>{`₹ ${price}`}</h4>
                            <h4 className='text-sm font-bold text-left rounded-sm'>{type}</h4>
                        </div>
                    </div>
                    <div className='flex flex-col md:gap-1 w-full'>
                        <span className='text-sm rounded-sm w-full min-h-[60px] text-justify line-clamp-3' title={desc}>{desc}</span>
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <div className='rounded-full h-[24px] self-end flex md:gap-2 text-white bg-customRed justify-center items-center'>
                        {
                            quantity > 0? (
                                <>
                                    <button className='flex items-center justify-center text-center h-full w-full md:px-4' onClick={decrementQuantity}>-</button>
                                    <div className='flex items-center justify-center text-center w-[20px] min-w-[20px]'>
                                        {
                                            quantity
                                        }
                                    </div>
                                    <button className='flex items-center text-center justify-center md:py-1 w-full md:px-4' onClick={incrementQuantity}>+</button>
                                </>
                            ) : (
                                <button onClick={incrementQuantity} className='font-bold text-sm md:py-1 w-[114px]'>
                                    ADD TO CART
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MenuItem

export const MenuItemPlaceHolder = () =>{
    return (
    <div className='rounded-xl shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] ease-in-out duration-300 cursor-pointer'>
        <div className='duration-0 animate-pulse flex flex-col justify-center md:w-[160px] md:gap-2 w-full'>
            <div className={`h-[160px] w-[160px] rounded-xl flex md:p-1 items-end justify-between bg-slate-200`}>
                <div className='w-[20px] h-[20px] rounded-md bg-white'/>
                <div className='w-[20px] h-[20px] rounded-md bg-white'/>
            </div>
            <div className='flex flex-col md:p-2 md:pt-0 justify-center items-center text-center md:gap-2 w-full'>
                <h4 className='h-[10px] rounded-sm w-[100px] bg-slate-200'></h4>
                <div className='flex justify-between w-full'>
                    <h4 className='h-[10px] rounded-sm w-[80px] bg-slate-200'></h4>
                    <h4 className='h-[10px] rounded-sm w-[40px] bg-slate-200'></h4>
                </div>
                <div className='flex flex-col md:gap-1 w-full'>
                    <h4 className='h-[10px] rounded-sm w-full bg-slate-200'></h4>
                    <h4 className='h-[10px] rounded-sm w-full bg-slate-200'></h4>
                    <h4 className='h-[10px] rounded-sm w-full bg-slate-200'></h4>
                </div>
            </div>
        </div>
    </div>
  )
}