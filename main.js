import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import signIn from "./routes/signIn.js"
import logIn from "./routes/logIn.js"
import dashboard from "./routes/dashboard.js";

dotenv.config({ path: './.env' });

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.use('/save',signIn);
app.use('/login',logIn);
app.use("/dashboard", dashboard);

const conn = mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log('Connection is done');})
.catch((error)=>{console.log(error);});


app.get('/',(req,res)=>{
    res.sendFile('./public/index.html',{root:__dirname});
});

app.listen(port,()=>{
    console.log(`Listen to port ${port}`);
    
});