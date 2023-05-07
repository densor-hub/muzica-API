const router = require('express').Router();

router.route('/')

    .get(async (req, res) => {

        try {
            if (!req?.cookies?.Bearer) {
                res.sendStatus(200);
            }
            else {
                let UserExists = await db.collection('users').findOne({ refresher: req?.cookies?.Bearer });

                if (UserExists !== null) {
                    db.collection("users").replaceOne({ _id: UserExists._id }, { _id: UserExists._id, username: UserExists.username, password: UserExists.password, fullname: UserExists.fullname, gender: UserExists.gender, stagename: UserExists.stagename, profilePicture: UserExists.profilePicture, email: UserExists?.email, websiteCreated: UserExists?.websiteCreated, googleId: UserExists?.googleId, refresher: "" }).then((results) => {
                        if (results.modifiedCount > 0) {
                            req?._destroy(null, () => {
                                res?.clearCookie('Bearer');
                                res.sendStatus(200);
                            });
                        }
                        else {
                            res.sendStatus(408)
                        }
                    })
                }
                else {
                    res.sendStatus(200);
                }
            }
        } catch (error) {
            console.log(error);
            res?.sendStatus(500);
        }
    })

module.exports = router;
