const router = require('express').Router();
const { ObjectId } = require('mongodb')

router.route('/')

    .get(async (req, res) => {
        if (!req?.isAuthenticated()) {
            res.sendStatus(401);
        }
        else {
            try {
                let isValidUser = await db.collection('users').findOne({ _id: ObjectId(req?.session.passport?.user) });

                if (isValidUser === null) {
                    res.sendStatus(401)
                }
                else {
                    let currentContent = await db.collection('currentconent').findOne({ userId: isValidUser?._id });

                    if (currentContent !== null) {
                        res?.status(200)?.json(currentContent)
                    }
                    else {
                        res.sendStatus(204);
                    }
                }

            } catch (error) {
                console.log(error);
                res?.sendStatus(500);
            }
        }
    })

    .post(async (req, res) => {
        if (!req?.isAuthenticated()) {
            res.sendStatus(401);
        }
        else {
            try {

                let isValidUser = await db.collection('users').findOne({ _id: ObjectId(req?.session.passport?.user) });


                if (isValidUser === null) {
                    res.sendStatus(403)
                }
                else {
                    let currentContentExists = await db.collection('currentconent').findOne({ userId: isValidUser._id });
                    if (currentContentExists === null) {

                        await db.collection('currentconent').insertOne({ userId: isValidUser?._id, currentContent: req?.body?.content, submitted: req?.body?.content }).then((results) => {
                            if (results?.insertedId) {
                                res.sendStatus(200)
                            }
                        })
                    }
                    else {
                        await db.collection('currentconent').replaceOne({ userId: isValidUser?._id }, { _id: currentContentExists?._id, userId: isValidUser?._id, currentContent: req.body?.content, submitted: currentContentExists?.submitted }).then((results) => {
                            if (results?.modifiedCount > 0) {
                                res?.sendStatus(200);
                            }
                            else {
                                res.sendStatus(204);
                            }
                        })
                    }
                }

            } catch (error) {
                console.log(error);
                res?.sendStatus(500);
            }
        }
    })

module.exports = router;

