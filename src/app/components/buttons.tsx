'use client';
import Image from "next/image";
import { useRouter } from 'next/navigation';

import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';

import { contents } from "@/data/website";

export const OrderNow = () =>{

    const orderNowScroll = () =>{
        const targetElement = document.getElementById('scrollTarget');
        if (targetElement) {
            const yOffset = -100; // Adjust the offset as needed
            const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }

    return(
        <button className='flex justify-center items-center md:gap-2 md:px-6 md:py-4 md:mt-6 rounded-full font-bold text-white bg-customRed hover:scale-105 ease-in-out duration-300' onClick={orderNowScroll}>
            {
                `${contents.text8}  `
            }
            <ArrowRightOutlinedIcon sx={{ color: 'white'}}/>
        </button>
    )
}

export const LearnMore = () =>{

    const learnMoreClick = () =>{
        //add video
    }

    return(
        <button className='flex justify-center items-center md:gap-2 md:px-6 md:py-4 md:mt-6 rounded-full font-bold text-black hover:scale-105 ease-in-out duration-300' onClick={learnMoreClick}>
            {
                `${contents.text9}  `
            }
            <div className="flex justify-center items-center bg-customRed rounded-full">
            <ArrowRightOutlinedIcon sx={{ color: 'white'}}/>
            </div>
        </button>
    )
}

interface CategoryButtonProps{
    name: string,
    icon: string,
    redirect: string
}

export const CategoryButton= ({name, icon, redirect}: CategoryButtonProps) =>{

    const router = useRouter();

    const categoryClick = () =>{
        router.push(redirect);
    }

    return(
        <button className="group flex flex-col justify-center items-center rounded-2xl hover:shadow-lg hover:shadow-customRed outline-2 outline outline-customRed hover:bg-customRed ease-in-out duration-300 md:p-16 md:gap-4" onClick={categoryClick}>
            <div className="rounded-full outline-2 outline outline-customRed md:p-4 bg-customLightRed group-hover:outline-white">
                <Image src={icon} width={48} height={48} alt='pizza'/>
            </div>
            <h4 className="font-bold group-hover:text-white">{name}</h4>
        </button>
    )
}

export const ExploreMenu= () =>{

    const router = useRouter();

    const exploreMenu = () =>{
        router.push('/menu');
    }

    return(
        <button className='flex justify-center items-center md:gap-2 md:px-6 md:py-4 md:mt-6 rounded-full font-bold text-white bg-customRed hover:scale-105 ease-in-out duration-300' onClick={exploreMenu}>
            {
                `${contents.text12}  `
            }
            <ArrowRightOutlinedIcon sx={{ color: 'white'}}/>
        </button>
    )
}