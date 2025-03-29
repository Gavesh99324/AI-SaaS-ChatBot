import { Router } from 'express';
import { getAllUsers, userLogin, userSignup } from '../controllers/user-controllers.js';
import { validate, loginValidator, signupValidator } from "../utils/validators.js";
import { verifyToken } from '../utils/token-manager.js';

const userRoutes = Router();

userRoutes.get("/", getAllUsers);

userRoutes.post("/signup", validate(signupValidator), userSignup);

userRoutes.post("/login", validate(loginValidator), userLogin);

userRoutes.post("/auth-status", verifyToken, userLogin);
 

export default userRoutes;




 

