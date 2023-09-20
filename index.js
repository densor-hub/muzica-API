const express = require("express");
const { connectToDb, getDb } = require("./dbConn");
const path = require("path");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
require("dotenv")?.config;

const VerifyURLparams = require("./Middleware/VerifyURLparams");
const VerifyJWT = require("./Middleware/verifJWT");
const verifySearch = require("./Middleware/verifySearch");
const SingleItem = require("./Middleware/SingleItem");
//const VerifyFrontendPath = require('./Middleware/verifyFrontEndPath');

const PORT = 3500;

const server = express();

//provided frontend is not on same site as backend, frontend url is what is used as origin in cors
server.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

server.use(cookieParser());
server.use(express.json());
server.use(fileUpload());

//db connection
connectToDb((err) => {
  if (!err) {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    db = getDb();
  }
});

//pulic
server.use("/api/register", require("./Routes/registerUser"));
server.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

//servinf front end
// server.use('/', express.static(path.join(__dirname, 'build')));
// server.use(VerifyFrontendPath);

//login process
server.use("/api/sign-in/local", require("./Routes/loginJWT"));

//signout route before authentication verification because user could access whiles not authenticated and user must be directed to login page which that happens
server.use("/api/logout", require("./Routes/signOutJWT"));

server.use("/api/refresh", require("./Routes/refreshJWT"));
server.use("/api/sign-in/google", require("./Routes/auth0google"));

//before verify jwt since there is a posibility of changing username

server?.use("/api/reset-password", require("./Routes/reset-password"));

server?.use(VerifyURLparams);

//protected
server.use(VerifyJWT);
server?.use("/api/user", require("./Routes/user-settings-Route"));
server.use("/api/save-audio", require("./Routes/saveAudio"));
server.use("/api/save-video", require("./Routes/saveVideo"));
server.use("/api/save-image", require("./Routes/saveImage"));
server.use("/api/save-upcoming", require("./Routes/saveUpcoming"));
server.use("/api/save-news", require("./Routes/saveNews"));
server.use("/api/save-biography", require("./Routes/saveBiography"));
server.use(
  "/api/save-social-media-platforms",
  require("./Routes/saveSocialmedia")
);
server.use("/api/save-bookings", require("./Routes/saveBookings"));
server.use("/api/create-website", require("./Routes/createWebsite"));
server.use("/api/current-content", require("./Routes/currentContent"));
server.use("/api/get-added-audios", require("./Middleware/getUplodtedItems"));
server.use("/api/get-added-videos", require("./Middleware/getUplodtedItems"));
server.use("/api/get-added-images", require("./Middleware/getUplodtedItems"));
server.use("/api/get-added-upcoming", require("./Middleware/getUplodtedItems"));
server.use("/api/get-added-news", require("./Middleware/getUplodtedItems"));
server.use(
  "/api/get-added-biography",
  require("./Middleware/getUplodtedItems")
);
server.use(
  "/api/get-added-socialmedia",
  require("./Middleware/getUplodtedItems")
);

server?.use(verifySearch);
server?.use(SingleItem);

//note
//images identifications
//AUDIO COVER ARTS -------> caca - compressed audio cover art (200x200)
//IMAGES -----------------> c-img - compressed image (500x500)
//PROFILE OR DISPLAY PICTURES -> cdp - compressed display picture
