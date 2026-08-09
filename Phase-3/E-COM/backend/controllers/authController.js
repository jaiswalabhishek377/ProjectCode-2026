// import User from "../models/usermodel.js"





export const login = async ( req,res) => {
    res.send("Login route");
}

export const signup = async (req,res) =>{
   const {email,password,name} = req.body
   const userExists = await User.findOne({email});

   if(userExists){
    return res.status(500).json({message:"User already exists"});
   }

   const newuser = await User.create({
    name,email,password
   })
   res.status(201).json({user,message:"User created successfully"});
};

export const logout = async (req,res) => {
    res.send("Logout route");
}