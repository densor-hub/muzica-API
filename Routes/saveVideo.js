const router = require('express').Router();
const { ObjectId } = require('mongodb');
const { isValidDate } = require('../FNS/DurationValidator');



router.route('/')

    .post(async (req, res) => {
        try {
            if (!(req?.cookies?.Bearer)) {
                res.sendStatus(401);
            }
            else {
                if (!req?.body || !req?.body?.title || req?.body?.title?.length <= 0 || req?.body?.link?.length <= 0 || !req?.body?.link || !req?.body?.dateReleased || !isValidDate(req?.body?.dateReleased) || !new Date(req?.body?.dateReleased) || (!(req.body.link?.startsWith('https://') && new URL(req.body.link?.trim())?.origin?.toLowerCase().endsWith('youtube.com')))) {
                    res?.sendStatus(405);
                }
                else {

                    let isValidUser = await db.collection('users').findOne({ refresher: String(req?.cookies?.Bearer) });

                    if (isValidUser === null) {
                        res.sendStatus(403)
                    }
                    else {
                        await db.collection('videos').insertOne({ userId: isValidUser?._id, title: req?.body?.title, link: req?.body?.link, dateReleased: req?.body?.dateReleased }).then(async (results) => {
                            if (results.insertedId) {

                                if (Boolean(req?.body?.not_current_content) === true) {
                                    res?.sendStatus(200)
                                }
                                else {
                                    let existingCurrentContent = await db.collection('currentconent')?.findOne({ userId: isValidUser?._id });

                                    if (existingCurrentContent !== null) {
                                        db.collection('currentconent')?.replaceOne({ _id: existingCurrentContent?._id }, { _id: existingCurrentContent?._id, userId: existingCurrentContent?.userId, currentContent: 'videos', submitted: 'videos' }).then(() => {
                                            res?.sendStatus(200);
                                        }
                                        )
                                    } else {
                                        db.collection('currentconent')?.insertOne({ userId: isValidUser?._id, currentContent: "videos", submitted: "videos" }).then((results) => {
                                            if (results?.insertedId) {
                                                res.sendStatus(200);
                                            } else {
                                                res?.sendStatus(204)
                                            }
                                        })
                                    }
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
    })

module.exports = router;