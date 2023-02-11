const { ObjectId } = require('mongodb');
const create_Username_url = require('../FNS/create-usernameInUrl');
const router = require('express')?.Router();

router.route('/')

    .get(async (req, res) => {

        if (!req?.isAuthenticated()) {
            res?.sendStatus(403);
        }
        else {
            try {
                UserExists = await db.collection('users')?.findOne({ _id: ObjectId(req?.session?.passport?.user) })

                if (UserExists !== null && UserExists !== undefined) {
                    ///res?.header('Access-Control-Allow-Origin', '*');
                    res.status(200).json({ "stagename": `${UserExists.stagename}`, "profilePicture": UserExists.profilePicture, stagenameInUrl: create_Username_url(UserExists?.stagename), websiteCreated: UserExists?.websiteCreated })
                }
            } catch (error) {
                console.log(error);
                res?.sendStatus(500);
            }
        }
    })

module.exports = router;