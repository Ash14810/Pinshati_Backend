import express from "express";
import { sign } from "../modules/event.js";
import bcrypt from "bcrypt";
const router = express.Router();

router.post('/',async(req,res)=>{
    console.log(req.body);
    try {
        const {name,email,password,role} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
const input = new sign({
    name,
    email,
    password:hashedPassword,
    role
})
await input.save();
res.send("Saved Succesfully !!!")
    } catch (error) {
        console.log(error);
         }

});

// module.exports = router;
export default router;