const router = require('express').Router();

router.route('/')

    .post(async (req, res) => {
        if (!req?.cookies?.Bearer) {
            res.sendStatus(401);
        }
        else {
            if (!req?.body || !req?.body?.platforms || req?.body?.platforms?.length <= 0) {
                res?.sendStatus(405);
            }
            else {
                try {

                    const socialmediaPlatforms = { facebook: "facebook", twitter: "twitter", instagram: "instagram", tiktok: "tiktok" }
                    let invalidUrlprovided = 0;
                    req?.body?.platforms?.forEach(element => {
                        if (!element?.profilelink?.startsWith('https://')) {
                            invalidUrlprovided = invalidUrlprovided + 1
                        }
                        else {
                            if (element?.socialmedia === socialmediaPlatforms?.facebook) {
                                if (!(element?.profilelink?.startsWith('https://') && new URL(element?.profilelink?.trim())?.origin?.toLowerCase().endsWith(socialmediaPlatforms?.facebook + '.com'))) {
                                    invalidUrlprovided = invalidUrlprovided + 1;
                                }
                            }

                            if (element?.socialmedia === socialmediaPlatforms?.twitter) {
                                if (!(element?.profilelink?.startsWith('https://') && new URL(element?.profilelink?.trim())?.origin?.toLowerCase().endsWith(socialmediaPlatforms?.twitter + '.com'))) {
                                    invalidUrlprovided = invalidUrlprovided + 1;
                                }
                            }

                            if (element?.socialmedia === socialmediaPlatforms?.instagram) {
                                if (!(element?.profilelink?.startsWith('https://') && new URL(element?.profilelink?.trim())?.origin?.toLowerCase().endsWith(socialmediaPlatforms?.instagram + '.com'))) {
                                    invalidUrlprovided = invalidUrlprovided + 1;
                                }
                            }

                            if (element?.socialmedia === socialmediaPlatforms?.tiktok) {
                                if (!(element?.profilelink?.startsWith('https://') && new URL(element?.profilelink?.trim())?.origin?.toLowerCase().endsWith(socialmediaPlatforms?.tiktok + '.com'))) {
                                    invalidUrlprovided = invalidUrlprovided + 1;
                                }
                            }

                        }
                    })


                    if (invalidUrlprovided === 0) {

                        let isValidUser = await db.collection('users').findOne({ refresher: req?.cookies?.Bearer });

                        if (isValidUser === null) {
                            res.sendStatus(403)
                        }
                        else {

                            let alreadySubmittedSocials = await db.collection('socialmedia')?.findOne({ userId: isValidUser?._id });

                            if (alreadySubmittedSocials !== null && alreadySubmittedSocials !== undefined) {
                                await db.collection('socialmedia').replaceOne({ userId: isValidUser?._id }, { _id: alreadySubmittedSocials?._id, userId: isValidUser?._id, platforms: req?.body }).then(async (results) => {

                                    if (req?.body?.not_current_content) {
                                        res.sendStatus(200)
                                    }
                                    else {
                                        if (results?.matchedCount > 0) {
                                            let existingCurrentContent = await db.collection('currentconent')?.findOne({ userId: isValidUser?._id });

                                            if (existingCurrentContent !== null) {
                                                db.collection('currentconent')?.replaceOne({ _id: existingCurrentContent?._id }, { _id: existingCurrentContent?._id, userId: existingCurrentContent?.userId, currentContent: 'socials', submitted: 'socials' }).then(() => {
                                                    res?.sendStatus(200);
                                                }
                                                )
                                            } else {
                                                db.collection('currentconent')?.insertOne({ userId: isValidUser?._id, currentContent: "socials", submitted: "socials" }).then((results) => {
                                                    if (results?.insertedId) {
                                                        res.sendStatus(200);
                                                    } else {
                                                        res?.sendStatus(204)
                                                    }
                                                })
                                            }
                                        }
                                        else {
                                            res.sendStatus(204);
                                        }
                                    }
                                })
                            }
                            else {
                                await db.collection('socialmedia').insertOne({ userId: isValidUser?._id, platforms: req?.body }).then(async (results) => {
                                    if (results.insertedId) {
                                        let existingCurrentContent = await db.collection('currentconent')?.findOne({ userId: isValidUser?._id });

                                        if (existingCurrentContent !== null) {
                                            db.collection('currentconent')?.replaceOne({ _id: existingCurrentContent?._id }, { _id: existingCurrentContent?._id, userId: existingCurrentContent?.userId, currentContent: 'socials', submitted: 'socials' }).then(() => {
                                                res?.sendStatus(200);
                                            }
                                            )
                                        } else {
                                            db.collection('currentconent')?.insertOne({ userId: isValidUser?._id, currentContent: "socials", submitted: "socials" }).then((results) => {
                                                if (results?.insertedId) {
                                                    res.sendStatus(200);
                                                } else {
                                                    res?.sendStatus(204)
                                                }
                                            })
                                        }
                                    }
                                    else {
                                        res.sendStatus(500);
                                    }
                                })
                            }
                        }
                    }
                } catch (error) {
                    console.log(error);
                    res?.sendStatus(500);
                }
            }
        }
    })

module.exports = router;