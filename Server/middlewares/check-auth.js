const HttpError = require("../models/http-error");
const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{
    if(req.method==='OPTIONS')
    {
        return next();
    }
    try {
        const token=req.headers.authorization.split(' ')[1];
        if(!token)
        {
         throw new Error('Authentication Failed');
        }
        const decodedToken=jwt.verify(token,'Verysecret');
        req.userData={userId:decodedToken.userId};
        //console.log(decodedToken.userId)
        next();

    } catch (error) {
        return next(new HttpError('Authentication Failed',401));
    }
}