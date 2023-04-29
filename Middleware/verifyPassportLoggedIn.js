const verifyLogin = (req, res, next) => {
    try {
        if (req?.isAuthenticated()) {
            return next()
        }
        else {
            res?.sendStatus(401)

        }
    } catch (error) {
        console.log(error);
        res?.sendStatus(500)
    }
}

module.exports = verifyLogin;