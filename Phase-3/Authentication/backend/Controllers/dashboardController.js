import userModel from "../Models/userModel.js";



const getUserInfo = async (req,res)=>{
    try {
        const userId = req.body.userId;
        if(!userId){
            return res.status(400).json({success:false,message:"User ID not found in token"});
        }
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(404).json({success:false,message:"User not found"});
        }
        res.json({ //send response json to frontend so it can display!
            success:true,
            name:user.name,
            email:user.email,
        });
    } catch (error) {
        console.log("error in getuserinfo",error);
        res.status(500).json({success:false,message:"Error fetching user info"});
    }
}

export default getUserInfo;