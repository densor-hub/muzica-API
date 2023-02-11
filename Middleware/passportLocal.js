
const LocalStrategy = require('passport-local')?.Strategy;
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

const authenticateUser = async (username, password, done) => {
    try {
        const user = await db.collection('users').findOne({ username: username });

        if (user !== null) {
            if (await bcrypt.compare(password, user?.password)) {
                done(null, user)
            }
            else {
                done(null, false)
            }
        }
        else {
            return done(null, false)
        }
    } catch (error) {
        done(error, false);
    }
}

const InitializePassport = (passport) => {
    passport.use('local', new LocalStrategy({ usernameField: 'username' }, authenticateUser));
    passport?.serializeUser((user, done) => {

        try {
            if (user?.provider === 'google') {
                db.collection('users')?.findOne({ googleId: user.id }).then((results) => {
                    if (results === null || results === undefined) {
                        db.collection('users')?.insertOne({ googleId: profile?.id, fullname: profile?._json?.name, profilePicture: profile._json?.picture, email: profile?._json?.email, stagename: profile?.displayName, gender: profile?.gender, websiteCreated: "" }).then((userCreated) => {

                            if (userCreated?.insertionId) {
                                done(null, userCreated._id);
                            }
                        })
                    } else {
                        done(null, results._id)
                    }
                })
            } else {
                done(null, user._id)
            }
        } catch (error) {
            console.log(error);
            done(error, false)
        }

    });

    passport?.deserializeUser(async (id, done) => {
        try {
            if (id?.length === 24) {
                await db.collection('users')?.findOne({ _id: ObjectId(id) }).then(results => {
                    if (results !== null && results !== undefined) {
                        done(null, results?._id);
                    }
                })
            } else {
                await db.collection('users')?.findOne({ googleId: id }).then(results => {
                    if (results !== null && results !== undefined) {
                        done(null, results?._id);
                    }
                })
            }
        } catch (error) {
            done(error, false)
        }

    })
}

module.exports = InitializePassport;