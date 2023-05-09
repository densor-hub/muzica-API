const jwt = require('jsonwebtoken');
const VerifyFrontendPath = require('./verifyFrontEndPath');
require("dotenv").config();



const VerifyJWT = (req, res, next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];

    if (!req?._parsedUrl?.path.includes('api/')) {
        VerifyFrontendPath()
    }
    else {
        if (authHeader) {
            let token = authHeader.split(" ")[1];

            jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET,
                (err, decoded) => {
                    if (err) {
                        res.sendStatus(401);
                    }
                    else {
                        next();
                    }
                })

        } else {
            res?.sendStatus(401);
        }
    }


}

module.exports = VerifyJWT;