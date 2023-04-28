const router = require('express').Router();

router.route('/')

    .get(async (req, res) => {

        try {
            if (!req?.isAuthenticated()) {
                res.sendStatus(200);
            }
            else {
                let UserExists = await db.collection('users').findOne({ _id: req?.user });
                if (UserExists !== null) {
                    req?.session?.destroy(() => {
                        res?.clearCookie('connect.sid');
                        res.sendStatus(200);
                    });
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
