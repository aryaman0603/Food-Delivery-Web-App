import jwt from "jsonwebtoken"

const authMiddleware = async (req,res,next) => {
    const {token} = req.headers;
    
    if(!token) {
        return res.json({sucess:false, message:"Unauthorized request, login again"})
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.body.userId = decodedToken.id;
        next();
    } catch (error) {
        console.log(error);
        return res.json({success:false, message:"Error"})
    }

}

export {authMiddleware}