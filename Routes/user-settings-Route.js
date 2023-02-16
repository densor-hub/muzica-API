const removeWhiteSpaces = require('../FNS/removeWhiteSpaces');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fileSystem = require('fs');
const path = require('path');
const create_Username_url = require('../FNS/create-usernameInUrl');
const { ObjectId } = require('mongodb');
const sharp = require('sharp');
const { isValidEmail } = require('../FNS/FormatStrings');
const { includesNumbers, includesSymbols } = require('../FNS/Includes');

const router = require('express').Router();

router.route('/')
    .get(async (req, res) => {
        try {
            if (!(req.cookies?.Bearer)) {
                res.sendStatus(401);
            }
            else {

                let isValidUser = await db.collection('users').findOne({ refresher: String(req?.cookies?.Bearer) });

                if (isValidUser === null) {
                    res.sendStatus(403)
                }
                else {
                    res.status(200)?.json({ "fullname": isValidUser?.fullname, "phone": isValidUser?.username, "gender": isValidUser?.gender, "stagename": isValidUser?.stagename, "email": isValidUser?.email, "profilePicture": isValidUser?.profilePicture });
                }
            }
        } catch (error) {
            console.log(error)
            res?.sendStatus(500);
        }
    })


    .post(async (req, res) => {
        try {
            if (!(req?.cookies?.Bearer)) {
                res.sendStatus(401);
            }
            else {

                let isValidUser = await db.collection('users').findOne({ refresher: req.cookies?.Bearer });

                if (isValidUser === null) {
                    res.sendStatus(403)
                }
                else {
                    if (!req?.body && !req?.files) {
                        res?.sendStatus(405)
                    }
                    else {

                        if (req?.files) {
                            if (!req?.files?.file) {
                                res.sendStatus(405);
                            }
                            else {
                                if (req?.files?.file?.size > (3 * 1024 * 1024)) {
                                    res.sendStatus(405);
                                }
                                else {
                                    if (isValidUser?.profilePicture !== "") {
                                        let ExitingDpfilePath = path?.join(__dirname, '..', new URL(isValidUser?.profilePicture)?.pathname);

                                        if (fileSystem.existsSync(ExitingDpfilePath)) {
                                            fileSystem?.unlink(ExitingDpfilePath, () => {
                                                SetNewImage(req, res, isValidUser)
                                            });
                                        }
                                        else {
                                            SetNewImage(req, res, isValidUser);
                                        }
                                    }
                                    else {
                                        SetNewImage(req, res, isValidUser);
                                    }
                                }
                            }
                        }
                        else if (req?.body && !req?.files) {

                            if (!req?.body?.phone || req?.body?.phone?.length <= 0 || !req?.body?.fullname || req?.body?.fullname?.length <= 0 || includesNumbers(req?.body?.fullname) || includesSymbols(req?.body?.fullname) || !req?.body?.gender || req?.body?.gender?.length <= 0 || !req?.body?.email || req?.body?.email?.length <= 0 || !isValidEmail(req?.body.email) || !req?.body?.stagename || req?.body?.stagename?.length <= 0) {
                                res?.sendStatus(405)
                            }
                            else {

                                let numberAlreadyTaken = await db.collection('users')?.findOne({ username: removeWhiteSpaces(req?.body?.phone.trim()) });
                                let emailAlreadyTaken = await db.collection('users')?.findOne({ email: req?.body?.email.trim() });

                                if ((emailAlreadyTaken !== null && numberAlreadyTaken !== null && ((numberAlreadyTaken?.email !== emailAlreadyTaken?.email) || (numberAlreadyTaken?.username !== emailAlreadyTaken?.username)))) {

                                    res.sendStatus(409);
                                }
                                else {

                                    await db.collection("users")?.replaceOne({ _id: isValidUser?._id }, { _id: isValidUser?._id, username: removeWhiteSpaces(req?.body?.phone), password: isValidUser?.password, fullname: req?.body?.fullname, gender: req?.body?.gender, stagename: req?.body?.stagename, email: req?.body?.email.trim(), profilePicture: isValidUser?.profilePicture, websiteCreated: isValidUser?.websiteCreated, googleId: isValidUser?.googleId, refresher: isValidUser?.refresher }).then(async (results) => {

                                        if (results?.matchedCount > 0) {
                                            if (removeWhiteSpaces(isValidUser?.username) !== removeWhiteSpaces(req?.body?.phone)) {

                                                await db.collection("users")?.replaceOne({ _id: isValidUser?._id }, { _id: isValidUser?._id, username: removeWhiteSpaces(req?.body?.phone), password: isValidUser?.password, fullname: req?.body?.fullname, gender: req?.body?.gender, stagename: req?.body?.stagename, email: req?.body?.email.trim(), profilePicture: isValidUser?.profilePicture, websiteCreated: isValidUser?.websiteCreated, googleId: isValidUser?.googleId, refresher: isValidUser?.refresher })
                                                    .then(async (noError) => {
                                                        if (noError) {
                                                            //send requisite auth  values
                                                            await db.collection('users')?.findOne({ _id: isValidUser?._id }).then((update) => {
                                                                res.status(200).json({ "stagename": `${update?.stagename}`, "profilePicture": update?.profilePicture, stagenameInUrl: create_Username_url(update.stagename), websiteCreated: update?.websiteCreated })
                                                            })
                                                        } else {
                                                            res.sendStatus(500);
                                                        }
                                                    })
                                            }
                                            else {
                                                await db.collection('users')?.findOne({ _id: isValidUser?._id }).then((update) => {
                                                    res.status(200).json({ "stagename": `${update?.stagename}`, "profilePicture": update?.profilePicture, stagenameInUrl: create_Username_url(update.stagename), websiteCreated: update?.websiteCreated, })
                                                })
                                            }
                                        }
                                    })
                                }
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.log(error);
            res?.sendStatus(500);
        }
    })

    .put(async (req, res) => {
        try {

            if (!req?.cookies?.Bearer) {
                res.sendStatus(401);
            }
            else {


                isValidUser = await db.collection('users').findOne({ refresher: req?.cookies?.Bearer });

                if (isValidUser === null) {
                    res.sendStatus(403)
                }
                else {
                    if (req?.body?.action === "DP") {
                        if (isValidUser?.profilePicture !== "") {
                            let ExitingDpfilePath = path?.join(__dirname, '..', new URL(isValidUser?.profilePicture)?.pathname);

                            if (fileSystem.existsSync(ExitingDpfilePath)) {
                                fileSystem?.unlink(ExitingDpfilePath, () => {

                                    db.collection('users').replaceOne({ _id: isValidUser._id }, { _id: isValidUser?._id, username: isValidUser?.username, password: isValidUser?.password, fullname: isValidUser?.fullname, gender: isValidUser?.gender, stagename: isValidUser?.stagename, profilePicture: '', email: isValidUser?.email, websiteCreated: isValidUser?.websiteCreated, googleId: isValidUser?.googleId, refresher: isValidUser?.refresher }).then((results) => {
                                        if (results?.matchedCount > 0) {
                                            res.status(200).json({ "accessToken": isValidUser?.refresher, "stagename": `${isValidUser.stagename}`, "profilePicture": "", stagenameInUrl: create_Username_url(isValidUser?.stagename), websiteCreated: isValidUser?.websiteCreated, });
                                        }

                                    });

                                });
                            } else {
                                db.collection('users').replaceOne({ _id: isValidUser._id }, { _id: isValidUser?._id, username: isValidUser?.username, password: isValidUser?.password, fullname: isValidUser?.fullname, gender: isValidUser?.gender, stagename: isValidUser?.stagename, profilePicture: '', email: isValidUser?.email, websiteCreated: isValidUser?.websiteCreated, googleId: isValidUser?.googleId, refresher: isValidUser?.refresher }).then((results) => {
                                    if (results?.matchedCount > 0) {
                                        res.status(200).json({ "accessToken": isValidUser?.refresher, "stagename": `${isValidUser.stagename}`, "profilePicture": "", stagenameInUrl: create_Username_url(isValidUser?.stagename), websiteCreated: isValidUser?.websiteCreated });
                                    }

                                });
                            }


                        }
                        else {
                            res?.sendStatus(405);
                        }
                    }
                }

            }
        } catch (error) {
            console.log(error);
            res?.sendStatus(500);
        }
    })

const SetNewImage = (req, res, isValidUser) => {
    let identifier = `${removeWhiteSpaces(isValidUser?.stagename.toLowerCase())}${Date.now()}`;
    let filePath = `${path.join(__dirname, '../uploads')}/${identifier}.${req.files.file.mimetype.split('/')[1]}`
    try {
        req.files.file.mv(filePath, (error) => {
            if (error) {
                res.sendStatus(500)
            }
            else {

                //cpudp- compressed user diaplay picture
                sharp(filePath).resize(200, 200)?.toFile(`${path?.join(__dirname, '../uploads')}/${identifier}-cpudp.${req.files.file.mimetype.split('/')[1]}`).then((results) => {
                    if (fileSystem?.existsSync(filePath)) {
                        fileSystem?.unlink(filePath, () => {
                        })
                    }

                    const imageURL = `${req.protocol}:${req.url + req.url}${req.get('host')}${req.url}uploads${req.url}${identifier}-cpudp.${req.files.file.mimetype.split('/')[1]}`;


                    db.collection('users').replaceOne({ _id: isValidUser._id }, { _id: isValidUser?._id, username: isValidUser?.username, password: isValidUser?.password, fullname: isValidUser?.fullname, gender: isValidUser?.gender, stagename: isValidUser?.stagename, profilePicture: imageURL, email: isValidUser?.email, websiteCreated: isValidUser?.websiteCreated, googleId: isValidUser?.googleId, refresher: isValidUser?.refresher }).then((results) => {
                        if (results?.matchedCount > 0) {
                            res.status(200).json({ profilePicture: imageURL });
                        } else {
                            if (fileSystem.existsSync(filePath)) {
                                fileSystem.unlink(filePath, () => {
                                    res.sendStatus(500);
                                });
                            }
                        }
                    });

                }, (error) => {
                    if (error) res?.sendStatus(500);
                })

            }
        })
    } catch (error) {
        console.log(error);
        res.sendStatus(500);

    }
}

module.exports = router;
