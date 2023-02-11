const jwt = require('jsonwebtoken');
require ('dotenv').config();
const router = require('express').Router();
const {ObjectId}= require('mongodb');
const removeWhiteSpaces = require('../FNS/removeWhiteSpaces');
const create_usernameInUrl = require('../FNS/create-usernameInUrl');


router.route('/')

.post (async(req, res)=>{
    const cookies = req?.cookies
    const refreshToken = cookies?.refreshToken;

        if(cookies){
            if(!refreshToken){
                res.sendStatus(403);
            }
            else if(refreshToken){
                let isValidRefreshToken;
                if(req.body._id){
                    isValidRefreshToken = await db.collection('users').findOne({ _id: ObjectId(req.body._id), refresher : refreshToken});
                }
                else{
                    if (! req.body._id){
                        isValidRefreshToken = await db.collection('users').findOne({  refresher : refreshToken});
                    }
                }
                

                //  await db.collection('users').findOne({ _id: ObjectId(req.body._id), refresher : refreshToken}).then((results)=>{
                    if(isValidRefreshToken===null){
                        res.sendStatus(403);
                    }
                    else{
                        //VERIFYING AND ASSIGNING NEW TOKENS
                                jwt.verify( 
                                    refreshToken,
                                    process.env.REFRESH_TOKEN_SECRET,
                                    (err, decoded)=>{
                                        if(err || removeWhiteSpaces(isValidRefreshToken.username) !== removeWhiteSpaces(decoded.username)){
                                            res.sendStatus(403);
                                        }
                                        else {
                
                                            const accesToken= jwt.sign(
                                                {'username': decoded.username,
                                                 "id": decoded.id },
                                                process.env.ACCESS_TOKEN_SECRET,
                                                {expiresIn : "30s"}
                                                )

                                                res.status(200).json({"accessToken" : accesToken, "id": `${isValidRefreshToken._id}`, "stagename": `${isValidRefreshToken.stagename}`, "profilePicture":isValidRefreshToken.profilePicture, "stagenameInUrl": create_usernameInUrl(isValidRefreshToken?.stagename), "websiteCreated": isValidRefreshToken?.websiteCreated}
                                            )
                                        }
                                    })
                            
                    }
                }
        }
        else {
            res.sendStatus(403)
          
        }
    
})


module.exports = router;
