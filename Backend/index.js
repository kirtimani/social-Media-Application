import express from "express";
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.routes.js";
dotenv.config();
const app = express();

const port = process.env.PORT || 5000



//middilware

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json())
app.use(cookieParser())

//api
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)

//authentication of middilware
app.listen(port, ()=>{
    connectDB()
    console.log(`server started at port ${port}`);
    
})