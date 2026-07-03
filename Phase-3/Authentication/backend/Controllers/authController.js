import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import User from "../Models/userModel.js";

const createToken= (userid)=>{
    return jwt.sign( {userid}, process.env.JWT_SECRET,{expiresIn:"1d"})
}
const register = async(req,res)=>{
    const {name,email,password} = req.body;
    try {
        const exists= await User.findOne({email});
        if(exists){
            return res.status(400).json({ error: "Email already registered" });
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({success:false, message:"Invalid email"})
        }
        if(password.length <8){
            return res.status(400).json({success:false,message:"Enter atleast 8 characters!"})
        }

        const salt= await bcrypt.genSalt(10)
        const hashedpassword= await bcrypt.hash(password,salt)
        const newUser= new User({
            name:name,
            email:email,
            password:hashedpassword
        });
        const user=await newUser.save()
        const token= createToken(user._id);
        res.json({success:true,token});

    } catch (error) {
        console.log(`Error in registeruser:${error}`)
        res.status(500).json({success:false,message:"Error in registering the User!"})
    }
}
const login = async(req,res)=>{
    const {email,password} = req.body
    try{
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({success:false,message:"User doesn't exist!"})
    }
    const passmatched = await bcrypt.compare(password,user.password);
    if(!passmatched){
        return res.status(400).json({success:false,message:"Incorrect Credentials!"})
    }
    const token = createToken(user._id)
    res.json({success:true,token})
    }
    catch(error){
        console.log("error occured loggin in:",error);
        res.status(400).json({success:false,message:"Error loggin in the User!"})
    }
}

export {register,login}





/* MONGOOSE
import User from "../models/user.model.js";

// Finding a user
const user = await User.findOne({ email });
// Creating a user
const newUser = new User({ fullName, email, password });
await newUser.save();

PRISMA
import { PrismaClient } from '@prisma/client';
import prisma from "../config/db.js";

const prisma = new PrismaClient();

// Finding a user
const user = await prisma.user.findUnique({ where: { email } });
// Creating a user
const newUser = await prisma.user.create({
  data: { fullName, email, password }
});*/