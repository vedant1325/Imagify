import express from "express"
import { generateImage } from "../contollers/imageController.js"
import userAuth from "../middlewares/auth.js";

const imageRouter=express.Router();
imageRouter.post('/generateImage',userAuth,generateImage);

export default imageRouter;
