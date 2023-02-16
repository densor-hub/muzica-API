const router = require('express').Router();
const dateValidator = require('../FNS/DurationValidator');




router.route('/')

    .post(async (req, res) => {
        try {
            if (!(req?.cookies?.Bearer)) {
                res.sendStatus(401);
            }
            else {
                if (!req?.body || !req?.body?.type || req?.body?.type.length <= 0 || !dateValidator.equal_To_Or_Bigger_Than_Toadys_Date(req?.body?.date) || req?.body?.date.length <= 0 || !req?.body?.specifics || req?.body?.specifics.length <= 0 || !req?.body?.description || req?.body?.description.length <= 0) {
                    res.sendStatus(405);
                }
                else {




                    let isValidUser = await db.collection('users').findOne({ refresher: String(req?.cookies?.Bearer) });

                    if (isValidUser === null) {
                        res.sendStatus(403)
                    }
                    else {
                        await db.collection('upcoming').insertOne({ userId: isValidUser._id, type: req.body?.type, date: req.body?.date, specifics: req.body?.specifics, description: req.body?.description }).then(async (results) => {
                            if (results?.insertedId) {
                                if (req?.body?.not_current_content) {
                                    res?.sendStatus(200);
                                }
                                else {
                                    let existingCurrentContent = await db.collection('currentconent')?.findOne({ userId: isValidUser?._id });

                                    if (existingCurrentContent !== null) {
                                        db.collection('currentconent')?.replaceOne({ _id: existingCurrentContent?._id }, { _id: existingCurrentContent?._id, userId: existingCurrentContent?.userId, currentContent: 'upcoming', submitted: 'upcoming' }).then(() => {
                                            res?.sendStatus(200);
                                        }
                                        )
                                    } else {
                                        db.collection('currentconent')?.insertOne({ userId: isValidUser?._id, currentContent: "upcoming", submitted: "upcoming" }).then((results) => {
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
            res.sendStatus(500);
        }
    })

module.exports = router;