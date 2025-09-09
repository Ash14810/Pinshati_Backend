import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sign from "../modules/event.js"
const router = express.Router();

router.post('/',async(req,res)=>{
 console.log(req.body);
   
    
const{email,password,role} = req.body;
const user = await sign.findOne({email,role});
if(!user){
  return  res.status(400).json({message:"Wrong email or role"})
}

const pass = await bcrypt.compare(password,user.password);
if(!pass){
  return  res.status(400).json({message:"Wrong Password"})
}
const token = jwt.sign(
    {id:user._id,role:user.role},
    process.env.JWT_SECRET,
    { expiresIn : process.env.JWT_EXPIRE}

);

let dashboardPath;
if (user.role === "consumer-student") {
  dashboardPath = "/dashboard/student";
} else if (user.role === "admin") {
  dashboardPath = "/dashboard/admin";
} else if (user.role === "wholesaler") {
  dashboardPath = "/dashboard/wholesaler";
} else if (user.role === "retailer") {
  dashboardPath = "/dashboard/retailer";
}

res.cookie("token", token, {
    httpOnly: true,
    secure: false, // true if HTTPS
    sameSite: "strict"
  });


res.json({message:"Login Successfull", redirect:dashboardPath});
});


export default router;