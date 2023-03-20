const express = require('express');
const { connectToDb, getDb } = require('./dbConn');
const path = require('path');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const VerifyURLparams = require('./Middleware/VerifyURLparams');
const VerifyJWT = require('./Middleware/verifJWT')
const verifySearch = require('./Middleware/verifySearch');
const SingleItem = require('./Middleware/SingleItem');


const PORT = 3500;

const server = express();

server.use(cors({
    origin: ['http://localhost:3000', 'http://44.203.228.254:3000', 'http://ec2-44-203-228-254.compute-1.amazonaws.com:3000'],
    credentials: true,
}))



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
server.use('/sign-in/local', require('./Routes/loginJWT'));
server.use('/refresh', require('./Routes/refreshJWT'));
server.use('/sign-in/google', require('./Routes/auth0google'));

//before verify jwt since there is a posibility of changing username 
server?.use('/user', require('./Routes/user-settings-Route'));

server?.use('/reset-password', require('./Routes/reset-password'));

server?.use(VerifyURLparams);

//protected
server.use(VerifyJWT);
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
server.use('/logout', require('./Routes/signOutJWT'))


server?.use(verifySearch);
server?.use(SingleItem)






