import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { delay, motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate=useNavigate();
  const{user,setShowLogin}=useContext(AppContext)
  const onClickHandler=()=>{
    if(user){
      navigate('/result');
    }
    else{
      setShowLogin(true)
    }

  }
  return (
    <motion.div
      className="flex flex-col justify-center items-center text-center my-20"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1.2 }}
      whileInView={{ opacity: 1, y: 0 }} // Fixed opacity typo
      viewport={{ once: true }}
    >
      <motion.div
        className="inline-flex text-stone-500 gap-2 bg-white text-center rounded-full px-6 py-1 border border-neutral-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.9 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <p>Best text to image generator</p>
        <img src={assets.star_icon} alt="" />
      </motion.div>
      <motion.h1
        className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto  text-center mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 2 }}
      >
        Turn text to <span className="text-blue-700">image</span>, in seconds.
      </motion.h1>

      <motion.p
        className="text-center max-w-xl mx-auto mt-7"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Unleash your creativity with AI. Turn your imagination into visual art
        in seconds - just type, and watch the magic happen.
      </motion.p>

      <button
        className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full   " onClick={onClickHandler} 
      >
        Generate Images
        <img className="h-6" src={assets.star_group} alt="" />
      </button>

      <motion.div className="flex flex-wrap justify-center gap-4 mt-4 p-1"
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{delay:1,duration:1}}>
        {Array(6)
          .fill("")
          .map((item, index) => (
            <motion.img
            whileHover={{scale:1.05,duration:0.1}}
              className="rounded-lg hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-11"
              width={70}
              src={index % 2 === 0 ? assets.sample_img_1 : assets.sample_img_2}
              alt="error"
              key={index}
            />
          ))}
      </motion.div>
      <motion.p
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{delay:1.2,duration:0.8}} className="mt-2 text-neutral-600">Generated images from Imagify</motion.p>
    </motion.div>
  );
};

export default Header;
