'use client';
import React, { useContext } from 'react';

import Image from 'next/image';
import Link from 'next/link';

interface FoodItemCardProps{
    name: string,
    price: number,
    image: string,
    qty: number
}

const FoodItemCard = ({name, price, image, qty}: FoodItemCardProps) => {

  return (
    <div className='rounded-[28px] flex flex-col md:gap-8 md:w-[240px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:shadow-xl ease-in-out duration-300 md:pb-6'>
        <Image src={image} width={240} height={200} style={{objectFit: 'cover'}} alt='food item image' className='rounded-[28px] object-cover md:h-[180px]'/>
        <div className='flex justify-between md:px-4'>
            <span>{name}</span>
            <span>{`$ ${price}`}</span>
        </div>
        <div className='flex justify-between md:px-4'>
            {qty /*add order button*/ } 
        </div>
    </div>
  )
}

export default FoodItemCard