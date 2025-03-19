import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import appRouter from "./routes/index.js"; 
//import userRoutes from "./routes/user-routes.js";

config()

const app = express();

// Middlewares
app.use(express.json());

// Remove it in production
app.use(morgan("dev"));

app.use("/api/v1", appRouter)
//app.use("/api/v1/user", userRoutes);

export default app;

console.log("Starting server...");

