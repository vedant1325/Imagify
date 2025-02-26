import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import {  motion } from "framer-motion";

const BuyCredits = () => {
  const{user}=useContext(AppContext);
  return (
    <motion.div className='min-h-[60vh] mb-10  pt-14 text-center'
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}>
     <button className='border border-gray-400 px-10 py-2 rounded-full mb-7'>Our Plans</button>
     <h1 className='text-3xl text-center font-medium sm:mb-10 mb-6 md:text-4xl'>Choose the plan</h1>


     <div className='flex flex-wrap justify-center gap-7 text-left'>
      {plans.map((item,index)=>(
        <div className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500 ' key={index}>
         <img width={40} src={assets.logo_icon} alt="" />
         <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
         <p className='text-sm'>{item.desc}</p>
         <p className='mt-6 '><span className='text-3xl text-blue-800'>${item.price}</span>/ {item.credits} credits</p>
         <button className='mt-8 bg-gray-800 text-white text-center w-full rounded-full py-2 min-w-52 text-sm cursor-pointer hover:scale-105 transition-all duration-500'>{user?'Purchase':'Get Started'}</button>
        </div>

      ))}
     </div>
    </motion.div>
  )
}

export default BuyCredits
