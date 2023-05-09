const router = require('express')?.Router();
const formatString = require('../FNS/FormatStrings');
const { ObjectId } = require('mongodb');


router?.route('/')

    .post(async (req, res) => {
        try {
            if (!(req?.cookies?.Bearer)) {
                res.sendStatus(401);
            }
            else {

                if ((((req?.body?.phone.length <= 0) && (req?.body?.email?.length > 0 && formatString.isValidEmail(req?.body?.email)))
                    || (req?.body?.email.length <= 0 && req?.body?.phone?.length > 0)
                    || (((req?.body?.email?.length > 0 && formatString.isValidEmail(req?.body?.email))) && (req?.body?.phone?.length > 0)))) {



                    let isValidUser = await db.collection('users').findOne({ refresher: req?.cookies?.Bearer });

                    if (isValidUser !== null && isValidUser !== undefined) {

                        let alreadySubmittedBookingsInfo = await db.collection('bookings-info')?.findOne({ userId: isValidUser?._id });

                        if (alreadySubmittedBookingsInfo === null) {
                            await db.collection('bookings-info')?.insertOne({ userId: isValidUser?._id, phone: req?.body?.phone, email: req?.body?.email })?.then(async (results) => {

                                if (results?.insertedId) {
                                    if (req?.body?.not_current_content) {
                                        res.sendStatus(200)
                                    }
                                    else {

                                        let existingCurrentContent = await db.collection('currentconent')?.findOne({ userId: isValidUser?._id });

                                        if (existingCurrentContent !== null) {
                                            db.collection('currentconent')?.replaceOne({ _id: existingCurrentContent?._id }, { _id: existingCurrentContent?._id, userId: existingCurrentContent?.userId, currentContent: 'socials', submitted: 'bookings' }).then(() => {
                                                res?.sendStatus(200);
                                            }
                                            )
                                        } else {
                                            db.collection('currentconent')?.insertOne({ userId: isValidUser?._id, currentContent: "socials", submitted: "bookings" }).then((results) => {
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
                                    res?.sendStatus(204)
                                }
                            });
                        }
                        else {
                            await db.collection('bookings-info')?.replaceOne({ userId: isValidUser?._id }, { _id: alreadySubmittedBookingsInfo?._id, userId: isValidUser?._id, phone: req?.body?.phone, email: req?.body?.email })?.then(async (results) => {

                                if (results?.matchedCount > 0) {
                                    if (req?.body?.not_current_content) {
                                        res.sendStatus(200)
                                    }
                                    else {
                                        if (results?.matchedCount > 0) {
                                            let existingCurrentContent = await db.collection('currentconent')?.findOne({ userId: isValidUser?._id });

                                            if (existingCurrentContent !== null) {
                                                db.collection('currentconent')?.replaceOne({ _id: existingCurrentContent?._id }, { _id: existingCurrentContent?._id, userId: existingCurrentContent?.userId, currentContent: 'socials', submitted: 'bookings' }).then(() => {
                                                    res?.sendStatus(200);
                                                }
                                                )
                                            } else {
                                                db.collection('currentconent')?.insertOne({ userId: isValidUser?._id, currentContent: "socials", submitted: "bookings" }).then((results) => {
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
                                }
                                else {
                                    res?.sendStatus(204)
                                }
                            });
                        }
                    } else {
                        res?.sendStatus(403);
                    }

                } else {
                    res?.sendStatus(405);
                }
            }
        } catch (error) {
            console.log(error);
            res?.sendStatus(500);
        }
    })

module.exports = router;