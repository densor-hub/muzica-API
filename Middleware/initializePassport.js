const LocalStrategy = require('passport-local')?.Strategy;
const bcrypt = require('bcrypt');

const initialize = (passport) => {
    const authenticateUser = async (username, password, done) => {
        try {
            const getUser = db.collection('users')?.findOne({ username: req?.body?.username });
            const User = getUser?.id;

            if (getUser !== null && User?.length === 24) {
                if (await bcrypt?.compare(req?.body?.passsword, getUser?.password)) {
                    return (done, User)
                }
            } else {
                return (done, false);
            }
        } catch (error) {
            console.log(error);
            return (done, false)
        }
    }

    passport?.use(new LocalStrategy({ usernameField: 'username' }), authenticateUser);

    passport?.serializeUser((user, done) => {
        try {

        } catch (error) {
            console.log(error);
            return (done, false)
        }
    });
    passport?.deserializeUser((user, done) => {

    })

}

module.exports = initialize;

