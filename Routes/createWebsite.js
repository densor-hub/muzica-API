const createUsernameInURL = require('../FNS/create-usernameInUrl');
const router = require('express').Router();
const DateValidator = require('../FNS/DurationValidator');

router.route('/')

    .post(async (req, res) => {
        if (!req?.cookies?.Bearer) {
            res.sendStatus(401);
        }
        else {
            try {

                let isValidUser = await db.collection('users').findOne({ refresher: req?.cookies?.Bearer });

                if (isValidUser === null) {
                    res.sendStatus(403)
                }
                else {

                    let submittedAudios = await db.collection('audios').find({ userId: isValidUser._id }).toArray()
                    let submittedVideos = await db.collection('videos').find({ userId: isValidUser._id }).toArray();
                    let submittedImages = await db.collection('images').find({ userId: isValidUser._id }).toArray();
                    let submitedUpcoming = await db.collection('upcoming').find({ userId: isValidUser._id }).toArray();
                    let submittedNews = await db.collection('news').find({ userId: isValidUser._id }).toArray();
                    let submittedBiography = await db.collection('biography').find({ userId: isValidUser._id }).toArray();
                    let submittedSocials = await db.collection('socialmedia').find({ userId: isValidUser._id }).toArray();

                    let UnExpiresUpcoming = submitedUpcoming?.filter((elements) => {
                        return DateValidator?.equal_To_Or_Bigger_Than_Toadys_Date(elements?.date);
                    })

                    let AllSubmitedDetails = [submittedAudios, submittedVideos, submittedImages, UnExpiresUpcoming, submittedNews, submittedBiography, submittedSocials];
                    let correspondingHeaders = ['audios', "videos", "images", "upcoming", "news", "biography", "socials"];
                    let websiteData = [];


                    if (AllSubmitedDetails.find(elements => { return elements?.length > 0 })) {
                        for (var i = 0; i < AllSubmitedDetails?.length; i++) {
                            let key = correspondingHeaders[i];
                            let value = AllSubmitedDetails[i];
                            websiteData.push({ key, value })
                        }
                    } else {
                        res?.sendStatus(405);
                    }

                    if (websiteData?.length === AllSubmitedDetails?.length) {

                        await db.collection('users').replaceOne({ _id: isValidUser?._id }, { _id: isValidUser?._id, username: isValidUser?.username, password: isValidUser?.password, fullname: isValidUser?.fullname, gender: isValidUser?.gender, stagename: isValidUser?.stagename, profilePicture: isValidUser?.profilePicture, googleId: isValidUser?.googleId, email: isValidUser?.email, websiteCreated: true, refresher: isValidUser.refresher }).then(async (results) => {

                            //changes from here
                            if (results?.matchedCount > 0) {
                                await db.collection('websitesCreated')?.insertOne({ userId: isValidUser?._id, stagename: createUsernameInURL(isValidUser?.stagename.toLowerCase()) }).then((newWebsite) => {
                                    const websiteUrl = `${req?.body?.clientOrigin}${req.url}home?a=${createUsernameInURL(isValidUser?.stagename.toLowerCase())}`;
                                    console.log(websiteUrl)
                                    res.status(200).send({ websiteUrl });
                                }
                                )
                            }
                        })
                    } else {
                        res.sendStatus(405);
                    }
                }

            } catch (error) {
                console.log(error)
                res.sendStatus(500);
            }
        }
    })

module.exports = router;