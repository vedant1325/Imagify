import React, { useContext, useEffect, useState } from "react";
import axios from "axios"
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import {motion} from "framer-motion";
import { toast } from "react-toastify";

const Login = () => {
;
  const [state, setState] = useState("Login");
  const{showLogin,setUser,setShowLogin,backendUrl,setToken}=useContext(AppContext);
  const[name,setName]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');

  useEffect(()=>{
    document.body.style.overflow='hidden';

    return()=>{
      document.body.style.overflow='unset'
    }
  });


  const onSubmitHandler=async(e)=>{
e.preventDefault();

try {
  if(state==='Login'){
    const {data}= await axios.post(backendUrl+'/api/user/login',{email,password});

    if(data.success){
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token',data.token);
      setShowLogin(false);
      toast.success('Login Successfully 😎👍');
    }
    else{
      toast.error(data.message)
    }
  }
  else{
    const {data}= await axios.post(backendUrl+'/api/user/register',{name,email,password});

    if(data.success){
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token',data.token);
      setShowLogin(false);
      toast.success('Account Created 😎👍');
    }
    else{
      toast.error(data.message)
    }
  }
} catch (error) {
  toast.error(error.message)
}
  }
  return (
    <motion.div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/40 flex justify-center items-center"
    initial={{opacity:0.2,y:50}}
    transition={{duration:0.3}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}>
      <form onSubmit={onSubmitHandler} className="relative p-10 rounded-xl text-slate-600 bg-white">
        <h1 className=" font-medium text-center text-2xl">{state}</h1>
        <p className="text-sm">Welcome back! Please sign in to continue</p>
        {state === "Sign Up" ? (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
            <img src={assets.profile_icon} width={20} alt="" />
            <input value={name} onChange={e=>setName(e.target.value)}
              className="outline-none text-sm"
              type="text"
              placeholder="Full Name"
              required
            />
          </div>
        ) : (
          ""
        )}

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.email_icon} alt="" />
          <input
            className="outline-none text-sm"
            type="email"
            placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}
            required
          />
        </div>
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src={assets.lock_icon} alt="" />
          <input
            className="outline-none text-sm" value={password} onChange={e=>setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <p className="text-sm text-blue-600 my-4 cursor-pointer">{state==="Sign Up"?'':'Forgot password'}
          
        </p>

        <button className="w-full bg-blue-600 text-white py-2 rounded-full hover:scale-105 transition-all duration-150">
           {state==='Sign Up'?'Create Account':'Login'}
        </button>
        {state === "Sign Up" ? (
          <p className="mt-5 text-center">
            Alredy have an account?{" "}
            <span onClick={()=>setState('Login')}  className="text-blue-600 cursor-pointer hover:text-blue-800">
              Login
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <span onClick={()=>setState('Sign Up')} className="text-blue-600 cursor-pointer hover:text-blue-800">
              Sign up
            </span>
          </p>
        )}

        <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} className="absolute top-5 right-5 cursor-pointer hover:scale-105" alt="" />
      </form>
    </motion.div>
  );
};

export default Login;
