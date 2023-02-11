const getWebsiteData =async(req, res, next)=>{
    const requestURL = `${req?.get('origin')}${req.url}`;

    
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

            let AllSubmitedDetails = [submittedAudios, submittedVideos, submittedImages, submitedUpcoming, submittedNews, submittedBiography, submittedSocials];
            let correspondingHeaders = ['webpage', 'audios', "videos","images", "upcoming", "news", "biography", "socials"];
            let websiteData = [];
            let validAPI_EndPoints =[];


            //corresponding data from database with key
            for(var i=0; i<AllSubmitedDetails?.length; i++){
                if(AllSubmitedDetails[i].length!==0){
                    
                    let key =correspondingHeaders[i];
                    let value = AllSubmitedDetails[i];
                    websiteData.push({key , value})
                    validAPI_EndPoints.push(req?.get("origin")+"/"+correspondingHeaders[i]+ req?._parsedUrl?.search)
                }
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
}
}

module.exports = getWebsiteData;