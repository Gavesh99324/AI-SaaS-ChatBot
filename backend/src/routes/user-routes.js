import { Router } from 'express';
import { getAllUsers, userLogin, userSignup, verifyUser, userLogOut } from '../controllers/user-controllers.js';
import { validate, loginValidator, signupValidator } from "../utils/validators.js";
import { verifyToken } from '../utils/token-manager.js';

const userRoutes = Router();

userRoutes.get("/", getAllUsers);

userRoutes.post("/signup", validate(signupValidator), userSignup);

userRoutes.post("/login", validate(loginValidator), userLogin);

userRoutes.get("/auth-status", verifyToken, verifyUser);

userRoutes.get("/logout", verifyToken, userLogOut);
   

export default userRoutes;




 

