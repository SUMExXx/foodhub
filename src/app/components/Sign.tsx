import React, { useContext, useEffect, useState } from 'react';

import { useGoogleAuth } from '@/app/context/useGoogleAuth';
import { AuthContext } from '@/app/context/AuthContext'
import {auth} from "@/app/context/firebase";
// import { cartItems } from '@/data/products';

import Image from 'next/image';
import Link from 'next/link';

import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, User, getAuth} from "firebase/auth";
import { contents } from '@/data/website';
import { useStateContext } from '../context/stateContext';
import { useRouter } from 'next/navigation';
import { userRoutes } from '@/data/apiRoutes';

interface UserDetails{
    name: string,
    imgUrl: string
}

const Sign = () =>{

    // const { user, googleSignIn, logOut} = useGoogleAuth();

    const router = useRouter()

    const { authentication, setAuthentication } = useStateContext()

    const { user, googleSignIn, logOut} = useContext(AuthContext);

    const [userDetails, setUserDetails] = useState<UserDetails>()

    const handleSignIn = async () =>{
        try{
            await googleSignIn()
        } catch(error){
            console.log(error)
        }
    }

    const goToProfile = () => {
        router.push('/profile')
    }

    useEffect(()=>{
        setAuthentication(auth)

        const fetchUserDetails = async () => {
            await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${userRoutes.getUserDetails}`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uuid: authentication?.currentUser?.uid }),
            })
            .then((res) => res.json())
            .then((data: {name: string, email: string, phone: string, addressLine1: string, addressLine2: string, state: string, imgUrl: string}) => {
                setUserDetails({name: data.name, imgUrl: data.imgUrl})
            })
            .catch((error) => {
            console.error('Error fetching cart data:', error);
            });
        }

        fetchUserDetails()

    }, [user, setAuthentication, authentication])

    if(user == null){
        return(
            <div className='flex gap-2'>
                <button className='md:px-6 h-full rounded-full font-bold text-white bg-customRed hover:scale-105 ease-in-out duration-100' onClick={handleSignIn}>
                    {
                        `${contents.text6}`
                    }
                </button>
            </div>    
        )
    }
    else{

        // let photoSrc = '';

        // if(auth.currentUser?.photoURL != null || auth.currentUser?.photoURL != undefined){
        //     photoSrc = auth.currentUser?.photoURL
        // }

        return(
            <div className='flex justify-center align-middle items-center md:px-4 h-full rounded-full font-bold text-white bg-customRed'>
                {
                    <>
                        <button className='flex justify-center items-center' onClick={goToProfile}>
                            {
                                <>
                                    <Image src={userDetails? userDetails.imgUrl: ""} alt="User Photo" className='object-cover rounded-full' width={24} height={24}/>
                                    <h5 className='px-2'>{userDetails?.name}</h5> 
                                </>
                            }
                        </button>
                        <button title='log Out' className='flex flex-row items-center align-middle justify-center rounded-full h-full px-1' onClick={logOut} style={{objectFit: 'cover'}}>
                            <LogoutOutlinedIcon sx={{color: 'white'}}/>
                        </button>
                    </>
                }
            </div>
        )
    }
}

export default Sign;