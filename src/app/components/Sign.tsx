import React, { useContext, useEffect } from 'react';

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

const Sign = () =>{

    // const { user, googleSignIn, logOut} = useGoogleAuth();

    const { authentication, setAuthentication } = useStateContext()

    const { user, googleSignIn, logOut} = useContext(AuthContext);

    const handleSignIn = async () =>{
        try{
            await googleSignIn()
        } catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        setAuthentication(auth)
    }, [user, setAuthentication])

    if(user == null){
        return(
            <div className='flex gap-2'>
                {/* <button className='py-2 px-2 rounded-full whitespace-nowrap' >
                    Sign In
                </button> */}
                <button className='md:px-6 h-full rounded-full font-bold text-white bg-customRed hover:scale-105 ease-in-out duration-100' onClick={handleSignIn}>
                    {
                        `${contents.text6}`
                    }
                </button>
            </div>    
        )
    }
    else{

        let photoSrc = '';

        if(auth.currentUser?.photoURL != null || auth.currentUser?.photoURL != undefined){
            photoSrc = auth.currentUser?.photoURL
        }

        return(
            <button className='flex justify-center align-middle items-center md:px-4 h-full rounded-full font-bold text-white bg-customRed'>
                <Image src={photoSrc} alt="User Photo" className='object-cover rounded-full' width={24} height={24}/>
                <h5 className='px-2'>{auth.currentUser?.displayName?.toString().substring(0, auth.currentUser?.displayName.toString().indexOf(' '))}</h5>
                <button title='log Out' className='flex flex-row items-center align-middle justify-center rounded-full h-full px-1' onClick={logOut} style={{objectFit: 'cover'}}>
                    <LogoutOutlinedIcon sx={{color: 'white'}}/>
                </button>
            </button>
        )

        /* 
            <button className='flex flex-row gap-1 justify-center align-middle items-center py-[8px] px-[20px] rounded-[20px] whitespace-nowrap text-white bg-[#264065]'>
                <Image src={photoSrc} alt="User Photo" className='object-cover rounded-full' width={24} height={24}/>
                <h5 className='px-2'>{auth.currentUser?.displayName?.toString().substring(0, auth.currentUser?.displayName.toString().indexOf(' '))}</h5>
                <button title='log Out' className='flex flex-row items-center align-middle justify-center rounded-full h-full bg-white px-1' onClick={logOut}>
                    <i className="fi fi-rs-sign-out-alt text-black flex flex-col justify-center align-middle"></i>
                </button>
            </button>   
        */
    }
}

export default Sign;