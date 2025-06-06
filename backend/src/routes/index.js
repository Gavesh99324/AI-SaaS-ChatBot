import { Router } from "express";
import { userInfo } from "os";
import userRoutes from "./user-routes.js";
import chatRoutes from "./chat-routes.js";


const appRouter = Router();

appRouter.use("/user", userRoutes); // domain/api/v1/users
appRouter.use("/chat", chatRoutes); // domain/api/v1/chats

export default appRouter;
