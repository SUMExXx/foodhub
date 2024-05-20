import { categories, contents, sampleFoodItems, webData } from "@/data/website";
import Image from "next/image";

import { CategoryButton, ExploreMenu, LearnMore, OrderNow } from "./components/buttons";
import FoodItemCard from "./components/FoodItemCard";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:pb-24">
      <section className="md:px-24 flex md:gap-16">
        <div className="flex flex-col items-start md:pt-8">
          <div className="md:px-4 md:py-2 font-medium md:text-3xl flex justify-center items-center text-customRed bg-gradient-to-r from-[#FFC8C82D] to-[#E3CDCDFF] rounded-full">
            {
              contents.text1
            }
          </div>
          <h1 className='font-extrabold md:text-8xl text-black md:mt-4'>
            {
              `${contents.text2} `
            }
            <span className="text-customRed">{`${contents.text3} `}</span>
            {
              `${contents.text4}`
            }
          </h1>
          <span className="mt-6 text-2xl md:pr-24">{`${contents.text5}`}</span>
          <div className="flex w-full">
            <OrderNow/>
            <LearnMore/>
          </div>
        </div>
        <div className="flex justify-center items-center md:min-w-[579px] md:pt-4">
            <Image width={579} height={560} alt='representational image' src={'/images/hero.png'}/>
        </div>
      </section>
      <section className="flex flex-col items-center md:mt-24" id="scrollTarget">
            <h1 className="font-extrabold text-6xl ">{`${contents.text7}`}</h1>
            <div className="md:mt-24 flex md:gap-24 justify-center items-center flex-wrap">
              {
                categories.map((category, index) => (
                  <CategoryButton key={index} name={category.name} icon={category.icon} redirect={category.redirect}/>
                ))
              }
            </div>
      </section>
      <section className="md:px-24 flex md:gap-16 md:mt-24">
        <div className="flex justify-center items-center md:min-w-[579px] md:pt-4">
            <Image width={579} height={560} alt='representational image' src={'/images/hero2.png'}/>
        </div>
        <div className="flex flex-col items-start md:pt-8">
          <h1 className='font-extrabold md:text-8xl text-black md:mt-4'>
            {
              `${contents.text10} `
            }
          </h1>
          <span className="md:mt-6 text-2xl md:pr-24">{`${contents.text11}`}</span>
          <div className="flex w-full">
            <ExploreMenu/>
          </div>
        </div>
      </section>
      <section className="md:px-24 flex flex-col md:gap-16 md:mt-24 justify-center items-center">
        <div className="flex flex-col items-center md:gap-4">
            <h1 className="font-bold text-3xl text-customRed">
              {
                `${contents.text18}`
              }
            </h1>
            <h3 className="font-bold text-4xl text-black">{contents.text20}</h3>
            <span className='md:w-[580px] text-center'>{contents.text19}</span>
        </div>
        <div className="flex flex-wrap justify-center md:gap-24">
              {
                sampleFoodItems.map((foodItem, index) => (
                  <FoodItemCard key={index} name={foodItem.name} price={foodItem.price} image={foodItem.image} qty={foodItem.qty}/>
                ))
              }
        </div>
      </section>
      <section className="md:px-24 flex md:gap-16 md:mt-24 relative">
        <div className="flex justify-center items-center md:min-w-[640px] md:pt-4">
            <Image className="z-10 absolute md:top-[120px] md:left-[180px]" width={320} height={560} alt='representational image' src={'/images/foodreviews.png'}/>
            <div className="absolute md:top-[080px] md:left-[240px] w-[300px] h-[340px] bg-customLightRed"/>
            <Image className="z-20 absolute md:top-[446px] md:left-[235px]" width={60} height={60} alt='reviewer' src={'/images/profile2.png'}/>
            <Image className="z-20 absolute md:top-[446px] md:left-[285px]" width={60} height={60} alt='reviewer' src={'/images/profile3.png'}/>
            <Image className="z-20 absolute md:top-[446px] md:left-[335px]" width={60} height={60} alt='reviewer' src={'/images/profile4.png'}/>
            <Image className="z-20 absolute md:top-[446px] md:left-[385px]" width={60} height={60} alt='reviewer' src={'/images/profile5.png'}/>
        </div>
        <div className="flex flex-col items-start md:pt-8">
          <h1 className='font-extrabold md:text-5xl text-black md:mt-4'>
            {
              `${contents.text14} `
            }
          </h1>
          <Image className="absolute md:top-[144px] md:left-[780px]" width={64} height={81} alt='quotes' src={'/icons/quotes_start.png'}/>
          <span className="md:mt-20 text-3xl md:pr-24 z-10">{`${contents.text15}`}</span>
          <Image className="absolute md:top-[254px] md:left-[1120px]" width={64} height={81} alt='quotes' src={'/icons/quotes_end.png'}/>
          <div className="flex w-full md:mt-10 gap-2">
            <Image className="" width={45} height={45} alt='stars' src={'/icons/material-symbols_star.png'}/>
            <Image className="" width={45} height={45} alt='stars' src={'/icons/material-symbols_star.png'}/>
            <Image className="" width={45} height={45} alt='stars' src={'/icons/material-symbols_star.png'}/>
            <Image className="" width={45} height={45} alt='stars' src={'/icons/material-symbols_star.png'}/>
            <Image className="" width={45} height={45} alt='stars' src={'/icons/material-symbols_star.png'}/>
          </div>
          <div className="flex justify-center items-center md:mt-6 md:gap-4">
            <Image className="" width={80} height={80} alt='quotes' src={'/images/profile1.png'}/>
            <div className="flex flex-col justify-center">
              <h5 className="font-bold text-2xl">{contents.text16}</h5>
              <h6 className="text-customRed font-medium">{contents.text17}</h6>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
