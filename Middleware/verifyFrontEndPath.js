const path = require('path');
const fileSystem = require("fs");

const VerifyFrontendPath = (req, res, next) => {

    if (req?._parsedUrl?.pathname?.includes('api/')) {
        next();
    } else {
        res?.sendFile(path?.join(__dirname, '..', 'build', 'index.html'));

    }
}

module.exports = VerifyFrontendPath;