import React, { useContext } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { navbarLinks } from '@/data/website';
import LoginAndCart from './LoginAndCart';

// import Menu from './Menu';

const Navbar = () => {

  return (
    <nav className='z-50 top-0 left-0 right-0 z-20 flex fixed justify-between bg-white text-black w-full md:px-[100px] px-2 h-[60px] md:h-[84px]' id='navbar_container'>
        
        <Link rel="canonical" href={'/'} className='flex items-center gap-2 md:gap-4 min-w-[110px]'>
            <div className='flex items-center'>
                <Image src={'/icons/Foodhub.png'} width={167} height={29} alt={'GSPH logo'} className='md:w-[116.9px] md:h-[20.3px] w-[40px] h-[40px]'></Image>
            </div>
        </Link>

        <div className='items-center md:gap-8 gap-2 font-medium md:flex hidden'>
            <ul className='items-center gap-10 font-medium md:flex hidden'>
                {
                    navbarLinks.map(item => (
                        <li key={crypto.randomUUID()} className='transition ease-in-out hover:animate-text hover:text-[#F00000]'>
                            <Link rel="canonical" href={item.link}>{item.text}</Link>
                        </li>
                    ))
                }
            </ul>
            <LoginAndCart/>
        </div>
    </nav>
  )
}

export default Navbar