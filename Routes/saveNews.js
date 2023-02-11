const router = require('express').Router();
const {ObjectId} = require('mongodb');


router.route('/')

.post(async(req, res)=>{

    if(!(req?.isAuthenticated())){
        res.sendStatus(401);
    }
    else{
        
        if(!req?.body || !req?.body?.details || !req?.body?.headline || req?.body?.details?.length<=0 || req?.body?.headline.length<=0){
            res.sendStatus(405);
        } 
        else{
            try {
                
            
               let isValidUser = await db.collection('users').findOne({_id : ObjectId(req?.session.passport?.user)});
        
               if(isValidUser === null){
                   res.sendStatus(403)
               }
               else{
                   await db.collection('news').insertOne({userId : isValidUser._id, headline :  req.body?.headline , details : req.body?.details}).then(async(results)=>{
                       if(results?.insertedId){
                           if(req?.body?.not_current_content){
                               res?.sendStatus(200);
                           }
                           else{
                               let existingCurrentContent=  await db.collection('currentconent')?.findOne({userId : isValidUser?._id});
       
                               if(existingCurrentContent !==null){
                               db.collection('currentconent')?.replaceOne({_id : existingCurrentContent?._id},{_id : existingCurrentContent?._id, userId: existingCurrentContent?.userId, currentContent : 'news', submitted : 'news'}).then(()=>{
                                   res?.sendStatus(200);
                               }
                               )
                               }else{
                               db.collection('currentconent')?.insertOne({userId : isValidUser?._id,  currentContent : "news", submitted : "news"}).then((results)=>{
                                   if(results?.insertedId){
                                       res.sendStatus(200);
                                   }else{
                                       res?.sendStatus(204)
                                   }
                               })
                               }
                           }
                       }
                       else{
                           res.sendStatus(500);
                       }
                       
                   })
                   
               }
            } catch (error) {
                console.log(error);
                res?.sendStatus(500);
            }
        }
    }
})

module.exports = router;