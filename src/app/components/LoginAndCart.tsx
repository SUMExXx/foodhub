'use client';
import React, { useContext } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Sign from './Sign';

// import Menu from './Menu';

const LoginAndCart = () => {

  return (
    <div className='flex md:gap-2 bg-customLightRed rounded-full h-[48px]'>
        <div className='flex justify-center items-center md:pl-4'>
            <Link href={'/'}><ShoppingCartOutlinedIcon sx={{ color: 'black' }}/></Link>
            <div className='h-5 w-5 flex justify-center items-center text-sm bg-customRed text-white rounded-full'>
                {
                    `2`
                }
            </div>
        </div>
        
        <Sign/>
    </div>
  )
}

export default LoginAndCart