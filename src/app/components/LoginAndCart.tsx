'use client';
import React, { useContext, useState, useEffect } from 'react';
import {auth} from "@/app/context/firebase";
import Image from 'next/image';
import Link from 'next/link';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Sign from './Sign';
import { userRoutes } from '@/data/apiRoutes';
import { useStateContext } from '../context/stateContext';

// import Menu from './Menu';

const LoginAndCart = () => {

  const { authentication, setAuthentication, cartRefresh } = useStateContext();

  const [cartCount, setCartCount] = useState(0)

  const [Id, setId] = useState<string | null>(null);

  const id = authentication?.currentUser?.uid

  // fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${userRoutes.getCart}`, {
  //   method: 'POST',
  //   body: JSON.stringify({uuid: id})
  // }).then((res) => {
  //   setcartCount(res.json.length)
  // })
  
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
          setCartCount(data.length);
        })
        .catch((error) => {
          console.error('Error fetching cart data:', error);
        });
    }

    return () => unsubscribe();
  }, [id, cartRefresh]);

  return (
    <div className='flex md:gap-2 bg-customLightRed rounded-full h-[48px]'>
        <div className='flex justify-center items-center md:pl-4'>
            <Link href={'/'}><ShoppingCartOutlinedIcon sx={{ color: 'black' }}/></Link>
            {
              cartCount > 0? (
                <div className='h-5 w-5 flex justify-center items-center text-sm bg-customRed text-white rounded-full'>
                    {
                        cartCount
                    }
                </div>
              ) : <></>
            }
        </div>
        
        <Sign/>
    </div>
  )
}

export default LoginAndCart