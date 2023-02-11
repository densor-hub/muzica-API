const jwt = require('jsonwebtoken');
require("dotenv").config();

const VerifyJWT =(req, res, next)=>{
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];

    if(!authHeader){
       res.sendStatus(401);
    }
    else  if(authHeader){
     let token =authHeader.split(" ")[1];
            jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET,
                (err, decoded)=>{
                    if(err){
                        console.log(err.message);
                        res.sendStatus(401);
                    }
                    else{
                        req.username = decoded.username;
                        next();
                    }
                })
    
    }
}

module.exports = VerifyJWT;