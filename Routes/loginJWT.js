const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const removeWhiteSpaces = require('../FNS/removeWhiteSpaces');
const create_Username_url = require('../FNS/create-usernameInUrl');
const includes = require('../FNS/Includes');
require('dotenv').config();

router.route('/')

    .post(async (req, res) => {
        try {

            if (!(req.body.username && req.body.password) || (req?.body?.username && req?.body?.username?.length <= 0) || (req?.body?.password && req?.body?.password?.length <= 0) ||
                (!((includes?.includesNumbers(req.body.password) && includes?.includesUpperCase(req.body.password) && includes.includesLowerCase(req.body.password)) ||
                    (includes.includesSymbols(req.body.password) && includes.includesUpperCase(req.body.password) && includes.includesLowerCase(req.body.password)) ||
                    (includes.includesNumbers(req.body.password) && includes.includesUpperCase(req.body.password) && includes.includesLowerCase(req.body.password) && includes.includesSymbols(req.body.password))))) {
                res.sendStatus(405);
            }
            else {
                let UserExists = await db.collection("users").findOne({ username: removeWhiteSpaces(req.body.username) });

                if (UserExists != null) {
                    let userIsSuspended = await db.collection('suspended').findOne({ _id: UserExists._id });

                    if (userIsSuspended !== null) {
                        res.status(405);
                    } else {

                        let match = await bcrypt.compare(req.body.password.trim(), UserExists.password);
                        if (match) {

                            let accesToken = jwt.sign(
                                {
                                    "username": UserExists.username,
                                    "id": UserExists?._id
                                },//payload
                                process.env.ACCESS_TOKEN_SECRET, //payload wil be converted and encrypted into this string
                                { expiresIn: "30s" } //expiration time
                            )

                            let refreshToken = jwt.sign(
                                {
                                    "username": UserExists.username,
                                    "id": UserExists?._id
                                },
                                process.env.REFRESH_TOKEN_SECRET,
                                { expiresIn: "1d" }
                            )

                            db.collection("users").replaceOne({ _id: UserExists._id }, { _id: UserExists._id, username: UserExists.username, password: UserExists.password, fullname: UserExists.fullname, gender: UserExists.gender, stagename: UserExists.stagename, profilePicture: UserExists.profilePicture, refresher: refreshToken, email: UserExists?.email, websiteCreated: UserExists?.websiteCreated, refresher: refreshToken })
                                .then((noError) => {
                                    if (noError) {
                                        //send http only refresh cookie
                                        res.cookie("Bearer ", refreshToken, { httpOnly: true, secure: true, domain: 'localhost', maxAge: 24 * 60 * 60 * 1000, sameSite: 'strict' });

                                        //send requisite auth  values
                                        res.status(200).json({ "accessToken": accesToken, "stagename": `${UserExists.stagename}`, "profilePicture": UserExists.profilePicture, stagenameInUrl: create_Username_url(UserExists?.stagename), websiteCreated: UserExists?.websiteCreated })
                                    } else {
                                        res.sendStatus(500);
                                    }
                                })
                        }
                        else {
                            res.sendStatus(405)
                        }
                    }
                }
                else {
                    res.sendStatus(405)
                };
            }
        } catch (error) {
            console.log(error);
            res?.sendStatus(500);
        }
    })

module.exports = router;