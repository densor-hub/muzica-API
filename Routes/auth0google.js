const router = require('express')?.Router();
const create_Username_url = require('../FNS/create-usernameInUrl');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('dotenv')?.config();


router?.route('/')
    ?.post(async (req, res) => {

        if (!req?.body?.user || req?.body?.user === undefined || req?.body?.user === null || req?.body?.user === '') {
            res?.sendStatus(405);
        }
        else {
            let user = req?.body?.user;
            let UserExists = await db.collection('users')?.findOne({ googleId: user?.sub?.split('|')[1] });
            // const accessToken = jwt?.sign(
            //     {
            //         "id": user?.sub?.split('|')[1],
            //         "email": user?.email
            //     },
            //     process?.env?.ACCESS_TOKEN_SECRET, {
            //     expiresIn: '30s',
            // })

            // const refreshToken = jwt.sign(
            //     {
            //         "id": user?.sub?.split('|')[1],
            //         "email": user.email
            //     },
            //     process?.env?.REFRESH_TOKEN_SECRET, {
            //     expiresIn: '1d'
            // })





            if (UserExists !== null && UserExists !== undefined) {

                //send http only refresh cookie
                // res.cookie("Bearer ", refreshToken, { httpOnly: true, secure: true, domain: 'localhost', maxAge: 24 * 60 * 60 * 1000, sameSite: 'lax' });

                // await db.collection('users')?.replaceOne({ _id: UserExists?._id }, { username: UserExists?.username, password: UserExists?.password, googleId: UserExists?.googleId, fullname: UserExists?.fullname, profilePicture: UserExists?.profilePicture, email: UserExists?.email, stagename: UserExists?.stagename, gender: UserExists?.gender, websiteCreated: UserExists?.websiteCreated, refresher: refreshToken }).then((results) => {
                //     if (results?.modifiedCount > 0) {
                //         res.status(200).json({ accessToken: accessToken, "stagename": `${UserExists.stagename}`, "profilePicture": UserExists.profilePicture, stagenameInUrl: create_Username_url(UserExists?.stagename), websiteCreated: UserExists?.websiteCreated, provider: "google" });
                //     }
                //     else {
                //         res?.sendStatus(204);
                //     }
                // })

            }
            else {
                UserExists = await db.collection('users')?.findOne({ email: String(user?.email) });

                if (UserExists !== null && UserExists !== undefined) {
                    //send http only refresh cookie
                    res.cookie("Bearer ", refreshToken, { httpOnly: true, secure: true, domain: 'localhost', maxAge: 24 * 60 * 60 * 1000, sameSite: 'lax' });

                    await db.collection('users')?.replaceOne({ _id: UserExists?._id }, { username: UserExists?.username, password: UserExists?.password, googleId: UserExists?.googleId, fullname: UserExists?.fullname, profilePicture: UserExists?.profilePicture, email: UserExists?.email, stagename: UserExists?.stagename, gender: UserExists?.gender, websiteCreated: UserExists?.websiteCreated, refresher: refreshToken }).then((results) => {
                        if (results?.modifiedCount > 0) {
                            res.status(200).json({ accessToken: accessToken, "stagename": `${UserExists.stagename}`, "profilePicture": UserExists.profilePicture, stagenameInUrl: create_Username_url(UserExists?.stagename), websiteCreated: UserExists?.websiteCreated, provider: "google" });
                        }
                        else {
                            res?.sendStatus(204);
                        }
                    })

                }
                else {

                    await db.collection('users')?.insertOne({ username: "", password: "", googleId: user?.sub?.split('|')[1], fullname: user.name, profilePicture: user.picture, email: user?.email, stagename: user?.name, gender: user?.gender, websiteCreated: "", refresher: refreshToken }).then((results) => {

                        //send http only refresh cookie
                        res.cookie("Bearer ", refreshToken, { httpOnly: true, secure: true, domain: 'localhost', maxAge: 24 * 60 * 60 * 1000, sameSite: 'lax' });

                        console.log(results)
                        res.status(200).json({ accessToken: accessToken, "stagename": `${user.name}`, "profilePicture": user.picture, stagenameInUrl: create_Username_url(user?.name), websiteCreated: "", provider: "google" })
                    })
                }
            }
        }
    })

module.exports = router;