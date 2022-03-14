const jwt = require('jsonwebtoken');
const SIGN_SECRET="userisauth$";

const fetchuser=(req,res,next)=>{
    const token=req.header('auth-token');   //getting token from header list 
    // console.log(token);
    if(!token){
        res.status(401).json({error:"please authenticate with a valid token"});
    }
    try {
        const data=jwt.verify(token,SIGN_SECRET);    //verifying token with our secret signature and also getting the user id 
        // console.log(data);
        req.user=data.user;     //storing the user in request so that we can access it later
        next();
    } catch (error) {
        res.status(401).json({error:"please authenticate with a valid token"});
    }
}


module.exports=fetchuser;