const router = require('express').Router();

router.route('/')

.get(async(req, res)=>{
    if(! req?.isAuthenticated()){
        res.sendStatus(200);
    }
    else{
        try {
            
       let UserExists = await db.collection('users').findOne({  refresher : req.cookies.refreshToken});

       if(UserExists !==null){
            db.collection("users").replaceOne({_id: UserExists._id}, {_id: UserExists._id, username: UserExists.username, password : UserExists.password, fullname: UserExists.fullname, gender: UserExists.gender, stagename: UserExists.stagename,  profilePicture: UserExists.profilePicture, email: UserExists?.email, websiteCreated : UserExists?.websiteCreated}).then((results)=>{
                if(results.modifiedCount>0){
                    res.sendStatus(200);
                }
                else{
                    res.sendStatus(408)
                }
            })
       }
       else{
        res.sendStatus(200);
       }
        } catch (error) {
            console.log(error);
            res?.sendStatus(500);
        }
    }
})

module.exports = router;
