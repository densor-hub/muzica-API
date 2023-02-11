const router = require('express')?.Router();
const bcrypt = require('bcrypt');
const includes = require('../FNS/Includes');
const removeWhiteSpaces = require('../FNS/removeWhiteSpaces');
const nodeMailer = require('nodemailer');
const { ObjectId } = require('mongodb');
require('dotenv')?.config();


router?.route('/')
    ?.get(async (req, res) => {
        if (req?.isAuthenticated()) {
            let isValidUser = await db.collection('users')?.findOne({ _id: ObjectId(req?.session?.passport?.user) });

            if (isValidUser === null || isValidUser === undefined) {
                res?.sendStatus(403);
            }
            else {
                try {
                    if (isValidUser?.googleId !== "" && isValidUser?.googleId !== undefined && isValidUser?.googleId !== null) {
                        if (isValidUser?.password === null) {
                            res?.status(200)?.json({ loginWithNoPassword: true });
                        }
                        else {
                            res?.status(200)?.json({ loginWithNoPassword: false });
                        }
                    } else {
                        res?.status(200)?.json({ loginWithNoPassword: false });
                    }
                } catch (error) {
                    console.log(error)
                    res?.sendStatus(500)
                }
            }
        }
        else {
            res?.sendStatus(401);
        }
    })
    ?.post(async (req, res) => {

        if (!(req?.isAuthenticated())) {
            //no refresh token
            if (!req?.body.code && !req?.body?.password && !req?.body.confirmpassword && (req?.body?.username && req?.body?.username?.trim()?.length > 0)) {
                try {


                    let isValidUser = await db.collection('users')?.findOne({ username: removeWhiteSpaces(req?.body?.username) });
                    if (isValidUser !== null || isValidUser !== undefined) {
                        let CodeExists = await db.collection('verificationcode')?.findOne({ userId: isValidUser?._id });

                        let verficationCodeArray = [];
                        let verficationCode = ''
                        const lowerCaseKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
                        const numbersKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
                        const upperCaseKeys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


                        for (var i = 0; i < 2; i++) {
                            verficationCodeArray.push(upperCaseKeys[Math.floor(Math?.random() * upperCaseKeys?.length)]);
                            verficationCodeArray.push(numbersKeys[Math.floor(Math?.random() * numbersKeys?.length)]);
                            verficationCodeArray.push(lowerCaseKeys[Math.floor(Math?.random() * lowerCaseKeys?.length)]);
                        }

                        if (verficationCodeArray?.length === 6) {
                            for (var i = 0; i < verficationCodeArray.length; i++) {
                                verficationCode = verficationCode + verficationCodeArray[i];
                            }
                        }
                        else {
                            res?.sendStatus(405)
                        }

                        if (verficationCode.length === 6) {
                            console.log(isValidUser?.email)
                            let transporter = nodeMailer?.createTransport({
                                service: 'gmail',
                                port: 465,
                                secure: true,
                                auth: {
                                    user: `${process?.env?.APP_EMAIL}`,
                                    pass: `${process?.env?.APP_EMAIL_PASSWORD}`
                                }
                            });

                            let mailOptions = {
                                from: `${process?.env?.APP_EMAIL}`,
                                to: `${isValidUser?.email}`,
                                subject: 'Muzica account password reset',
                                text: `Verification code : ${verficationCode}`
                            }


                            if (CodeExists !== null && CodeExists !== undefined && isValidUser !== null && isValidUser !== undefined) {
                                await db.collection('verificationcode').replaceOne({ _id: CodeExists?._id }, { _id: CodeExists?._id, userId: isValidUser?._id, code: verficationCode, timeStamp: Date.now() }).then((results) => {
                                    if (results?.modifiedCount > 0) {
                                        //use node mailer to send email

                                        transporter?.sendMail(mailOptions, (error, success) => {
                                            if (error) {
                                                console.log(error);
                                                res?.sendStatus(502);
                                            }
                                            else if (success) {
                                                res?.status(200).json({ email: isValidUser?.email });
                                            }

                                        })
                                    }
                                });
                            }
                            else {
                                await db.collection('verificationcode').insertOne({ userId: isValidUser?._id, code: verficationCode, timeStamp: Date.now() }).then((resulst) => {
                                    console.log(resulst)
                                    if (resulst?.insertedId) {
                                        //use node mailer to send email
                                        transporter?.sendMail(mailOptions, (error, success) => {
                                            if (error) {
                                                res?.sendStatus(502);
                                            }
                                            else {
                                                res?.status(200)?.json({ email: isValidUser?.email });
                                            }
                                        })
                                    }
                                });
                            }
                        } else {
                            res?.sendStatus(405)
                        };
                    }
                } catch (error) {
                    console.log(error);
                    res?.sendStatus(500);
                }
            }

            else if (req?.body.code && req?.body?.code !== "" && req?.body?.password && req?.body?.password !== "" && req?.body?.confirmpassword && req?.body?.confirmpassword !== "" && req?.body?.password !== undefined && (req?.body?.confirmpassword === req?.body?.password) && ((includes.includesNumbers(req?.body?.password) && includes.includesUpperCase(req?.body?.password) && includes.includesLowerCase(req?.body?.password)) || (includes.includesSymbols(req?.body?.password) && includes.includesUpperCase(req?.body?.password) && includes.includesLowerCase(req?.body?.password)) || (includes.includesNumbers(req?.body?.password) && includes.includesUpperCase(req?.body?.password) && includes.includesLowerCase(req?.body?.password) && includes.includesSymbols(req?.body?.password)))) {
                try {

                    console.log('Passed')
                    console.log(req?.body?.code)

                    let CodeExists = await db.collection('verificationcode')?.findOne({ code: removeWhiteSpaces(req?.body?.code.trim()) });

                    if (CodeExists !== null && CodeExists !== undefined) {
                        let isValidUser = await db.collection("users")?.findOne({ _id: CodeExists?.userId });

                        if (isValidUser === null || isValidUser === undefined) {
                            res.sendStatus(204);
                        }
                        else if (Math.ceil((Date.now() - CodeExists?.timeStamp) / (60 * 60 * 60)) < 6) {

                            //change password
                            if (isValidUser === null) {
                                res.sendStatus(403)
                            }
                            else {
                                await bcrypt?.hash(req?.body?.password, 10).then(async (results) => {
                                    if (results !== null && results !== undefined) {
                                        await db.collection('users')?.replaceOne({ _id: isValidUser?._id }, { _id: isValidUser?._id, username: isValidUser?.username, password: results, fullname: isValidUser?.fullname, gender: isValidUser?.gender, stagename: isValidUser?.stagename, profilePicture: isValidUser?.profilePicture, email: isValidUser?.email, websiteCreated: isValidUser?.websiteCreated, refresher: isValidUser?.refresher }).then(async (results) => {
                                            if (results?.matchedCount > 0) {
                                                await db.collection('verificationcode')?.deleteOne({ _id: CodeExists?._id }).then((results) => {
                                                    res?.sendStatus(200);
                                                })
                                            }
                                            else {
                                                res?.sendStatus(201);
                                            }
                                        })
                                    }
                                })
                            }

                        } else {
                            res?.sendStatus(408);
                        }
                    }

                    else {
                        res?.sendStatus(406);
                    }
                } catch (error) {
                    console.log(error);
                    res?.sendStatus(500);
                }
            }
            else {
                res?.sendStatus(401);
            }
        }
        else if (req?.isAuthenticated()) {
            let allSet = false;
            if (req?.previousPassword) {
                if (!req?.body?.newPassword || !req?.body?.confirmNewPassword || !req?.body?.previousPassword || (req?.body?.confirmNewPassword !== req?.body?.newPassword) || (req?.body?.newPassword === req?.body?.previousPassword)) {
                    res.sendStatus(405);
                }
                else {
                    allSet = true;
                }
            }
            else if (!req?.previousPasswor) {
                if (!req?.body?.newPassword || !req?.body?.confirmNewPassword || (req?.body?.confirmNewPassword !== req?.body?.newPassword)) {
                    res.sendStatus(405);
                } else {
                    allSet = true;
                }
            }

            if (allSet) {
                try {

                    let isValidUser = await db.collection('users').findOne({ _id: ObjectId(req?.session.passport?.user) });

                    if (isValidUser === null) {
                        res.sendStatus(403)
                    }
                    else {

                        if (isValidUser?.username === "" || isValidUser?.username === null || isValidUser?.username === undefined ||
                            isValidUser?.gender === "" || isValidUser?.gender === null || isValidUser?.gender === undefined) {
                            res?.sendStatus(406)
                        }
                        else {

                            if (isValidUser?.password === null || isValidUser?.password === undefined || isValidUser?.password === "") {
                                await bcrypt.hash(req?.body.newPassword, 10).then((resulst) => {
                                    if (resulst !== null && resulst !== undefined) {
                                        db.collection('users')?.replaceOne({ _id: isValidUser?._id }, { _id: isValidUser?._id, username: isValidUser?.username, password: resulst, fullname: isValidUser?.fullname, gender: isValidUser?.gender, stagename: isValidUser?.stagename, profilePicture: isValidUser?.profilePicture, email: isValidUser?.email, websiteCreated: isValidUser?.websiteCreated, googleId: isValidUser?.googleId }).then((results) => {
                                            if (results?.matchedCount > 0) {
                                                res?.sendStatus(200);
                                            }
                                        })
                                    }
                                })
                            }
                            else {
                                let validOldPassword = await bcrypt?.compare(req?.body?.previousPassword, isValidUser?.password);
                                if (validOldPassword) {
                                    await bcrypt?.hash(req?.body?.newPassword, 10).then((results) => {
                                        if (results !== null && results !== undefined) {
                                            db.collection('users')?.replaceOne({ _id: isValidUser?._id }, { _id: isValidUser?._id, username: isValidUser?.username, password: results, fullname: isValidUser?.fullname, gender: isValidUser?.gender, stagename: isValidUser?.stagename, profilePicture: isValidUser?.profilePicture, email: isValidUser?.email, websiteCreated: isValidUser?.websiteCreated, googleId: isValidUser.googleId }).then((results) => {
                                                if (results?.matchedCount > 0) {
                                                    res?.sendStatus(200);
                                                }
                                            })
                                        }
                                    })
                                }
                                else {
                                    res?.sendStatus(204);

                                }
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