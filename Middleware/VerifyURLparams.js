const { ObjectId } = require('mongodb');
const DateValidator = require('../FNS/DurationValidator')

const VerifyURLparams= (async(req, res, next)=>{
    if(! (String(req?.method)===String('GET'))){
        next()
    }
    else{
        try {
                    
            const requestURL = `${req?.get('origin')}${req.url}`;

            if((req?.get('origin')===undefined) || (req?.get('origin')===null) ){
                next()
            }
            else{

            if(requestURL.split('?').length===0 || ! (new URL(requestURL)?.searchParams?.has('id')  && new URL(requestURL)?.searchParams?.has("artiste"))){
                next();
            } else{

                    if(new URL(requestURL)?.searchParams.has("id") && new URL(requestURL)?.searchParams.has("artiste")){
                    let id =new URL(requestURL)?.searchParams.get("id");

                    if((id?.length === 24 && !id?.endsWith('/')) || (id?.length === 25 && id?.endsWith('/'))){
                        if((id?.length === 25 && id?.endsWith('/'))){
                            id = id?.slice(0, id?.length-1)
                        }
                    let isValidUserWebsite = await db.collection('users').findOne({_id : ObjectId(id)});


                    if(isValidUserWebsite ===null || isValidUserWebsite === undefined){
                        res.sendStatus(404);
                    }else{

                        //get all posts from Database
                        let submittedAudios = await db.collection('audios').find({userId : isValidUserWebsite._id}).toArray()
                        let submittedVideos = await db.collection('videos').find({userId : isValidUserWebsite._id}).toArray();
                        let submittedImages = await db.collection('images').find({userId : isValidUserWebsite._id}).toArray();
                        let submitedUpcoming = await db.collection('upcoming').find({userId : isValidUserWebsite._id}).toArray();
                        let submittedNews = await db.collection('news').find({userId : isValidUserWebsite._id}).toArray();
                        let submittedBiography = await db.collection('biography').find({userId : isValidUserWebsite._id}).toArray();
                        let submittedSocials = await db.collection('socialmedia').find({userId : isValidUserWebsite._id}).toArray();
                        let submittedBookingsInfo = await db.collection('bookings-info')?.find({userId : isValidUserWebsite._id}).toArray();


                        //filtereing upcoming to attain unexpired upcoming
                        let UnexpiredUpcoming=[];
                    if(submitedUpcoming?.length>0){
                            submitedUpcoming?.forEach((element)=>{
                                if(DateValidator?.equal_To_Or_Bigger_Than_Toadys_Date(element?.date)){
                                    UnexpiredUpcoming.push(element);
                                }
                            });
                    }
                    
                        let AllSubmitedDetails = [submittedAudios, submittedVideos, submittedImages, UnexpiredUpcoming, submittedNews, submittedBiography, submittedSocials, submittedBookingsInfo];
                        let correspondingHeaders = [ 'audios', "videos","images", "upcoming", "news", "biography", "contact", 'bookings-info', 'webpage'];
                        let websiteData = [];
                        let validAPI_EndPoints =[];


                        //corresponding data from database with key
                        for(var i=0; i<AllSubmitedDetails?.length; i++){
                        // if(AllSubmitedDetails[i].length!==0){
                                let key =correspondingHeaders[i];
                                let value = AllSubmitedDetails[i];
                                websiteData.push({key , value})
                                validAPI_EndPoints.push(req?.get("origin")+"/"+correspondingHeaders[i]+ req?._parsedUrl?.search)
                        //  }
                        }


                        if(websiteData?.length === AllSubmitedDetails?.length){
                                res.status(200).json({websiteData, validAPI_EndPoints})
                        }
                        else{
                            res.sendStatus(404)
                        }
                    }
                }else{
                    res.sendStatus(404);
                }
                }
            } }
        } catch (error) {
            console.log(error)
            res?.sendStatus(500);
        }
    }})

module.exports = VerifyURLparams;