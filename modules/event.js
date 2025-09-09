import mongoose from "mongoose";
const {Schema} = mongoose;

const signUp = new Schema({
name:{type:"String",required:true},
email:{type:"String",required:true},
password:{type:"String",required:true},
role:{type:"String",required:true}
});

 const sign = mongoose.model('sign',signUp);
export { sign };
 export default sign;