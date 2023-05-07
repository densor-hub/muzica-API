const path = require('path');
const fileSystem = require("fs");

const VerifyFrontendPath = (req, res, next) => {
    console.log(req)
    if (req?._parsedUrl?.pathname?.includes('api/')) {
        next();
    } else {
        console?.log(fileSystem?.existsSync(path?.join(__dirname, '..', 'build', 'index.html')))
        res?.sendFile(path?.join(__dirname, '..', 'build', 'index.html'));

    }
}

module.exports = VerifyFrontendPath;