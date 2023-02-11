const router = require('express').Router();
const fileSystem = require('fs');
const path = require('path')
const removeWhiteSpaces = require('../FNS/removeWhiteSpaces');
const {ObjectId} = require('mongodb');
const { isValidDate } = require('../FNS/DurationValidator');
const sharp = require('sharp');



router.route('/')

.post(async(req, res)=>{
    
    if(!(req?.isAuthenticated())){
        res.sendStatus(401);
    }
    else{
            if(!req?.body || !req?.body?.title || req?.body?.title?.length <=0 || !req?.body?.datereleased || req?.body?.datereleased?.length<=0 || !isValidDate(req?.body?.datereleased) || 
                (req.body.applemusic && ! (req.body.applemusic?.startsWith('https://') && new URL( req.body.applemusic?.trim())?.origin?.toLowerCase().endsWith('apple.com')))|| 
                (req.body.spotify && ! (req.body.spotify?.startsWith('https://') && new URL( req.body.spotify?.trim())?.origin?.toLowerCase().endsWith('spotify.com')))||
                (req.body.audiomack && ! (req.body.audiomack?.startsWith('https://') && new URL( req.body.audiomack?.trim())?.origin?.toLowerCase().endsWith('audiomack.com')))||
                (req.body.youtube && !  ( req?.body?.youtube?.startsWith('https://')  && ((new URL( req?.body?.youtube?.trim())?.origin?.toLowerCase().endsWith('youtube'?.toLowerCase()+".com"))
                || (new URL(req?.body?.youtube)?.origin.endsWith(('youtube'?.toLowerCase()?.slice(0,5)+'.'+'youtube'?.trim().slice(5,8))?.trim())))))||
                (req.body.soundcloud && ! (req.body.soundcloud?.startsWith('https://') && new URL( req.body.soundcloud?.trim())?.origin?.toLowerCase().endsWith('soundcloud.com'))) ){
                    res?.sendStatus(405);
                }
            else{
                try {
                    
                    isValidUser = await db.collection('users').findOne({_id : ObjectId(req?.session.passport?.user)});
    
                if(isValidUser === null){
                    res.sendStatus(403)
                }
                else{
                    if(!req?.files?.file){
                        res.sendStatus(405);
                    }
                    else{
                        if(req?.files?.file?.size> (3 * 1024 * 1024)){
                            res.sendStatus(405);
                        }
                        else{
                            console.log('this-farrr')
                            let identifier= `${removeWhiteSpaces(req.body.title.toLowerCase())}${Date.now()}`;
                            let filePath = `${path.join(__dirname, '../uploads')}${req.url}${identifier}.${req.files.file.mimetype.split('/')[1]}`
                            try {
                                req.files.file.mv(filePath, (error)=>{
                                    if(error){
                                        res.sendStatus(500)
                                    }
                                    else{
                                        sharp(filePath)?.resize(200,200)?.toFile(`${path?.join(__dirname,'../uploads')}/${identifier}-cpcr.${req.files.file.mimetype.split('/')[1]}`).then((results)=>{
    
                                            if(results){
                                                //cpcr - compressed audio cover art
                                                fileSystem?.unlink(filePath,()=>{
                                                    const imageURL = `${req.protocol}://${req.get('host')}${req.url}uploads${req.url}${identifier}-cpcr.${req.files.file.mimetype.split('/')[1]}`;

                                                    db.collection('audios').insertOne({ userId : isValidUser._id , title : req.body?.title, coverart : imageURL, datereleased : req?.body?.datereleased, applemusic : req?.body?.applemusic,spotify : req?.body?.spotify, audiomack : req?.body?.audiomack, youtube: req?.body?.youtube, soundcloud : req?.body?.soundcloud, uniqueId: identifier  }).then(async (results)=>{
    
                                                        if(results?.acknowledged && results?.insertedId){
                                                            if(req.body.not_current_content){
                                                                res?.sendStatus(200);
                                                            }
                                                            else{
                                                                let existingCurrentContent=  await db.collection('currentconent')?.findOne({userId : isValidUser?._id});
                    
                                                                if(existingCurrentContent !==null){
                                                                db.collection('currentconent')?.replaceOne({_id : existingCurrentContent?._id},{_id : existingCurrentContent?._id, userId: existingCurrentContent?.userId, currentContent : 'audios', submitted : 'audios'}).then(()=>{
                                                                    res?.sendStatus(200);
                                                                }
                                                                )
                                                                }else{
                                                                db.collection('currentconent')?.insertOne({userId : isValidUser?._id,  currentContent : "audios", submitted : "audios"}).then((results)=>{
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
                                                            if(fileSystem.existsSync(filePath)){
                                                                fileSystem.unlink(filePath, ()=>{
                                                                    res.sendStatus(500);
                                                                });
                                                            }
                                                        }
                                                });
                                                })
                                            }
                                        })
                                       
    
                                        
                                    }
                                })
                                
                            } catch (error) {
                                console.log(error);
                                res.sendStatus(500);
                                
                            }
                        }
                    }
                }
                } catch (error) {
                    console.log(error);
                    res.sendStatus(500);
                }

            }
        }
})

module.exports = router;