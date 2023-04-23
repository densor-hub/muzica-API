const router = require('express').Router();
const { ObjectId } = require('mongodb');


router.route('/')

    .post(async (req, res) => {
        try {
            if (!(req?.isAuthenticated())) {
                res.sendStatus(401);
            }
            else {


                if (!req?.body || !req?.body?.biography || req?.body?.biography?.length < 100) {
                    res.sendStatus(405);
                }
                else {

                    let isValidUser = await db.collection('users').findOne({ _id: req?.user });
                    if (isValidUser === null) {
                        res.sendStatus(403)
                    }
                    else {
                        let isExistingBioGraphy = await db.collection('biography').findOne({ userId: isValidUser?._id })

                        if (isExistingBioGraphy !== null && isExistingBioGraphy !== undefined) {
                            await db.collection('biography')?.replaceOne({ _id: isExistingBioGraphy?._id }, { _id: isExistingBioGraphy?._id, userId: isExistingBioGraphy?.userId, biography: req.body?.biography }).then(async (results) => {

                                if (results?.modifiedCount > 0) {
                                    if (req?.body?.not_current_content) {
                                        res?.sendStatus(200);
                                    }

                                } else {
                                    res.sendStatus(204);
                                }
                            })
                        }
                        else {
                            await db.collection('biography').insertOne({ userId: isValidUser._id, biography: req?.body?.biography }).then(async (results) => {
                                if (results?.insertedId) {
                                    if (req?.body?.not_current_content) {
                                        res?.sendStatus(200)
                                    }
                                    else {
                                        let existingCurrentContent = await db.collection('currentconent')?.findOne({ userId: isValidUser?._id });

                                        if (existingCurrentContent !== null) {
                                            db.collection('currentconent')?.replaceOne({ _id: existingCurrentContent?._id }, { _id: existingCurrentContent?._id, userId: existingCurrentContent?.userId, currentContent: 'biography', submitted: 'biography' }).then(() => {
                                                res?.sendStatus(200);
                                            }
                                            )
                                        } else {
                                            db.collection('currentconent')?.insertOne({ userId: isValidUser?._id, currentContent: "biography", submitted: "biography" }).then((results) => {
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
            }
        } catch (error) {
            console.log(error);
            res?.sendStatus(500);
        }
    })

module.exports = router;