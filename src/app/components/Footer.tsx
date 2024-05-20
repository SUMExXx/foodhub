import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { contents, footerLinks, socials } from '@/data/website'

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  return (
    <div className='w-full flex flex-col justify-center' id='contact'>
        <div className='w-full flex flex-wrap items-stretch gap-8 md:gap-36 justify-center px-6 md:px-24 py-6 md:py-16'>
          <div className='flex flex-col max-w-60'>
            <Image src={'/icons/Foodhub.png'} width={167} height={29} alt={'GSPH logo'} className='md:w-[116.9px] md:h-[20.3px] w-[40px] h-[40px] md:mb-8'></Image>
            <span>{contents.text13}</span>
            <div className='flex items-center md:mt-6 md:gap-4'>
              <Link href={socials.instagram} className='rounded-full bg-customRed p-1'><InstagramIcon sx={{color: 'white'}}/></Link>
              <Link href={socials.facebook} className='rounded-full bg-customRed p-1'><FacebookIcon sx={{color: 'white'}}/></Link>
              <Link href={socials.twitter} className='rounded-full bg-customRed p-1'><TwitterIcon sx={{color: 'white'}}/></Link>
            </div>
          </div>
          
          {
            footerLinks.map((item, index) => (
              <div key={index} className='flex flex-col max-w-60'>
                <h3 className='font-bold text-md'>{item.heading}</h3>
                {
                  item.links.map((link, index) => (
                    <Link key={index} className='md:mt-4' href={link.url}>{link.text}</Link>
                  ))
                }
              </div>
            ))
          }
        </div>
        <div className='px-2 md:px-6 py-2 md:py-6 flex justify-center items-center text-sm text-black'>
            2024 FoodHub © All rights reserved
        </div>
        
    </div>
  )
}

export default Footer