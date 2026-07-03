import jwt from 'jsonwebtoken'

const authMiddleware = async(req,res,next)=>{
    const { token } = req.headers;
    if(!token){
        return res.status(400).json({success:false,message:"Token doesn't exists!"})
    }
    try {
        const decodedtoken = jwt.verify(token,process.env.JWT_SECRET)
        req.body = req.body || {}; // ensure req.body is defined
        req.body.userId= decodedtoken.userid; // to get user id from token and store in req.body for further use
        next();
    } catch (error) {
        console.log("error in authorization",error);
        res.status(500).json({success:false,message:"Unauthorized: Invalid token"})
    }
}

export default authMiddleware;