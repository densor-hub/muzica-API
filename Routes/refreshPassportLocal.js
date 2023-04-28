const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = require('express').Router();
const { ObjectId } = require('mongodb');
const removeWhiteSpaces = require('../FNS/removeWhiteSpaces');
const create_usernameInUrl = require('../FNS/create-usernameInUrl');


router.route('/')
    .post(async (req, res) => {
        try {
            if (!req?.isAuthenticated()) {
                res.sendStatus(403);

            }
            else if (req.isAuthenticated()) {
                let isValidRefreshToken = await db.collection('users').findOne({ _id: req?.user });

                if (isValidRefreshToken === null) {
                    res.sendStatus(403);
                }
                else {
                    res.status(200).json({ isAuthenticated: req?.isAuthenticated(), "stagename": `${isValidRefreshToken.stagename}`, "profilePicture": isValidRefreshToken.profilePicture, "stagenameInUrl": create_usernameInUrl(isValidRefreshToken?.stagename), "websiteCreated": isValidRefreshToken?.websiteCreated }
                    )
                }

            }
        } catch (error) {
            console.log(error);
            res?.sendStatus(500);
        }
    })


module.exports = router;
