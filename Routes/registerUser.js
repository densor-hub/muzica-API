const router = require('express').Router();
const bcrypt = require('bcrypt');
const includes = require('../FNS/Includes')
const nodeMailer = require('nodemailer');
require('dotenv')?.config();

router.route('/')

    .post(async (req, res) => {

        if (!req?.body?.code) {
            if (!req?.body?.fullname || req?.body?.fullname?.length <= 0 || !req?.body?.gender || req?.body?.gender.length <= 0 || !req?.body?.stagename || req?.body?.stagename.length <= 0 || !req?.body?.dateofbirth || req?.body?.dateofbirth.length <= 0 || !(new Date(req?.body?.dateofbirth)) || !req?.body?.phonenumber || req?.body?.phonenumber.length <= 0 || !req?.body?.password || req?.body?.password.length <= 0 ||
                (!((includes?.includesNumbers(req.body.password) && includes?.includesUpperCase(req.body.password) && includes.includesLowerCase(req.body.password)) ||
                    (includes.includesSymbols(req.body.password) && includes.includesUpperCase(req.body.password) && includes.includesLowerCase(req.body.password)) ||
                    (includes.includesNumbers(req.body.password) && includes.includesUpperCase(req.body.password) && includes.includesLowerCase(req.body.password) && includes.includesSymbols(req.body.password))))
            ) {
                res.sendStatus(405);
            }
            else {
                try {
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
                        res?.sendStatus(500)
                    }

                    let previouslyTriedEmail = await db.collection('signingup')?.findOne({ email: req?.body?.email });
                    let previouslyTriedPhone = await db.collection('signingup')?.findOne({ username: req?.body?.phonenumber });


                    console.log(verficationCode)

                    if (verficationCode.length === 6) {
                        let transporter = nodeMailer?.createTransport({
                            service: 'gmail',
                            auth: {
                                user: `${process?.env?.APP_EMAIL}`,
                                pass: `${process?.env?.APP_EMAIL_PASSWORD}`
                            }
                        });

                        let mailOptions = {
                            from: `${process?.env?.APP_EMAIL}`,
                            to: `${req?.body?.email}`,
                            subject: 'Muzica sign up vefrification code',
                            text: `Hello, your verification code is : ${verficationCode}`
                        }

                        //use node mailer to send email
                        transporter?.sendMail(mailOptions, async (error, success) => {
                            if (error) {
                                res?.sendStatus(502)
                            }
                            else {
                                bcrypt?.hash(req?.body?.password, 10).then((newPassword) => {
                                    db.collection('signingup').insertOne({
                                        fullname: req?.body?.fullname.trim(),
                                        gender: req?.body?.gender.trim(),
                                        stagename: req?.body?.stagename.trim(),
                                        dateofbirth: req?.body?.dateofbirth.trim(),
                                        username: req?.body?.phonenumber.trim(),
                                        password: newPassword,
                                        profilePicture: "",
                                        email: req?.body?.email.trim(),
                                        code: verficationCode
                                    }).then(async (results) => {
                                        if (results?.acknowledged && results?.insertedId) {
                                            if (previouslyTriedEmail !== null || previouslyTriedPhone !== null) {
                                                db.collection('signingup')?.deleteOne({ _id: previouslyTriedEmail?._id }).then(() => {
                                                    db.collection('signingup')?.deleteOne({ _id: previouslyTriedPhone?._id }).then(() => {
                                                        res?.sendStatus(200);
                                                    });
                                                });
                                            } else {
                                                res?.sendStatus(200);
                                            }
                                        }
                                        else {
                                            res.sendStatus(500);
                                        }
                                    })
                                })
                            }
                        })

                    } else {
                        res?.sendStatus(500);
                    };
                } catch (error) {
                    console.log(error);
                    res.sendStatus(500);
                }

            }
        } else if (req?.body?.code) {
            if (req?.body?.code?.trim().length < 6) {
                res?.sendStatus(405);
            }
            else {
                try {

                    if (!(includes?.includesLowerCase(req?.body?.code) && includes?.includesNumbers(req?.body?.code) && includes?.includesUpperCase(req?.body?.code))) {
                        res?.sendStatus(405);
                    }
                    else {
                        let isSigningUp = await db.collection('signingup')?.findOne({ code: req?.body?.code.trim() });




                        if (isSigningUp !== null && isSigningUp !== undefined) {
                            console.log(isSigningUp);

                            db.collection('users').insertOne({
                                fullname: isSigningUp?.fullname,
                                gender: isSigningUp?.gender,
                                stagename: isSigningUp?.stagename,
                                dateofbirth: isSigningUp?.dateofbirth,
                                username: isSigningUp?.username,
                                password: isSigningUp.password,
                                profilePicture: isSigningUp?.profilePicture,
                                email: isSigningUp?.email,
                                websiteCreated: false

                            }).then(async (results) => {
                                if (results?.acknowledged && results?.insertedId) {
                                    await db.collection('signingup')?.deleteOne({ _id: isSigningUp?._id }).then(() => {
                                        res.sendStatus(200);
                                    });
                                }
                                else {
                                    res.sendStatus(500);
                                }
                            })
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