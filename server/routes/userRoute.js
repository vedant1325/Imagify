import express from "express"
import { loginUser,registerUser, userCredits } from "../contollers/userContollers.js";
import userAuth from "../middlewares/auth.js";


const userRouter=express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.get('/credits',userAuth,userCredits);

export default userRouter