const express = require('express');
const { connectToDb, getDb } = require('./dbConn');
const path = require('path');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const passport = require('passport');

const create_Username_url = require('./FNS/create-usernameInUrl');

const cors = require('cors');

const session = require('express-session');

const initiatePassportLocal = require('./Middleware/passportLocal');
initiatePassportLocal(passport);

require('./Routes/googleAuth');


const VerifyURLparams = require('./Middleware/VerifyURLparams');
const verifySearch = require('./Middleware/verifySearch');
const SingleItem = require('./Middleware/SingleItem');

const { ObjectId } = require('mongodb');
const verifyLogin = require('./Middleware/verifyPassportLoggedIn');

const PORT = 3500;

const server = express();

server.use(cors({
    origin: ['http://localhost:3000', 'http://172.20.10.2:3000', 'http://ec2-3-239-233-231.compute-1.amazonaws.com:3500'],
    credentials: true,
}))




server.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process?.env?.SESSEION_SECRET || 'secret',
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: 'auto'
    }
}));

server.use(passport.initialize());
server.use(passport.session())


server.use(cookieParser());
server.use(express.json());
server.use(fileUpload());



//db connection
connectToDb((err) => {
    if (!err) {
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
        db = getDb();
    }
})


//pulic
server.use('/register', require('./Routes/registerUser'));
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//GOOGLE AUTH ROUTE
const clientURL = 'http://localhost:3000/home'
server.use("/sign-in/google", passport?.authenticate('google', { scope: ['profile', 'email'] }));

//GOOLGLE CONSOLE REDIRCETS TO HERE
server.get('/google/callback',
    passport.authenticate('google',
        {
            failureRedirect: '/failed-to-login',
            successRedirect: clientURL
        }
    )
)






//SIGN IN USERNAME AND PASSWORD ROUTE
server.post('/sign-in/local',
    passport.authenticate('local', {
        failureRedirect: '/failed-to-login',
        successRedirect: '/user-verified'
    }));



//USER VERIFIED REDIRCET ROUTE
server.use('/user-verified', async (req, res) => {
    if (req?.isAuthenticated) {

        let UserExists;
        if (req?.session.passport?.user === 'google') {
            UserExists = await db.collection('users').findOne({ googleId: req?.session.passport?.user?.id });
        }
        else {
            console.log(req?.session?.passport)
            UserExists = await db.collection('users').findOne({ _id: ObjectId(req?.session.passport?.user) });
        }

        if (UserExists !== null || UserExists !== undefined) {
            res.status(200).json({ "stagename": `${UserExists.stagename}`, "profilePicture": UserExists.profilePicture, stagenameInUrl: create_Username_url(UserExists?.stagename), websiteCreated: UserExists?.websiteCreated })
        }
        else {
            res?.sendStatus(403);
        }

    } else {
        res?.sendStatus(403);
    }
})



//REFRESH ROUTE
server.use('/refresh', require('./Routes/refreshPassPortSession'));

server.use('/failed-to-login', (req, res) => {
    res?.sendStatus(405);
})


//FAILED TO VERIFY USER REDIRECT ROUTE

server.get('/sign-out', (req, res) => {
    if (req?.isAuthenticated()) {
        req?.logout({ keepSessionInfo: false }, (err) => {
            req?._destroy(null, (err) => {
                if (!err) {
                    res.clearCookie('connect.sid', { path: "/" });
                    res?.sendStatus(200);
                }
                else {
                    res?.sendStatus(500);
                }
            });
        });
    } else {
        res.sendStatus(200);
    }

})


//HOME ROUTE FOR GETTING
server.use('/home', (req, res) => {
    res?.redirect('/user-verified');
})



server.use(VerifyURLparams);

//before verify jwt since there is a posibility of changing username 
server?.use('/user', require('./Routes/user-settings-Route'));

server?.use('/reset-password', require('./Routes/reset-password'));

//protected

server.use(verifyLogin)

server.use('/save-audio', require('./Routes/saveAudio'));
server.use('/save-video', require('./Routes/saveVideo'));
server.use('/save-image', require('./Routes/saveImage'));
server.use('/save-upcoming', require('./Routes/saveUpcoming'));
server.use('/save-news', require('./Routes/saveNews'));
server.use('/save-biography', require('./Routes/saveBiography'));
server.use('/save-social-media-platforms', require('./Routes/saveSocialmedia'));
server.use('/save-bookings', require('./Routes/saveBookings'));
server.use('/create-website', require('./Routes/createWebsite'));
server.use('/current-content', require('./Routes/currentContent'));
server.use('/get-added-audios', require('./Middleware/getUplodtedItems'));
server.use('/get-added-videos', require('./Middleware/getUplodtedItems'));
server.use('/get-added-images', require('./Middleware/getUplodtedItems'));
server.use('/get-added-upcoming', require('./Middleware/getUplodtedItems'));
server.use('/get-added-news', require('./Middleware/getUplodtedItems'));
server.use('/get-added-biography', require('./Middleware/getUplodtedItems'));
server.use('/get-added-socialmedia', require('./Middleware/getUplodtedItems'));

server?.use(verifySearch);
server?.use(SingleItem)






