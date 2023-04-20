const compressor = require('compress-images');
const fileSystem = require('fs');
const path = require('path');
const removeWhiteSpaces = require('../FNS/removeWhiteSpaces');

const CompressImage = async (image, nameForFile) => {
    console.log(nameForFile)
    try {
        if (image?.mimetype === "image/png" || image?.mimetype === "image/jpg" || image?.mimetype === "image/svg" || image?.mimetype === "image/jpeg") {
            if (image?.size < 5 * 1024 * 1024) {
                const identifier = `${removeWhiteSpaces(nameForFile.toLowerCase())}${Date.now()}`;
                const filePath = `${path?.join(__dirname, '..', 'uploads')}/${identifier}.${image?.mimetype.split('/')[1]}`;

                const compressedFilePath = `${path?.join(__dirname, '..', 'uploads')}/${identifier}-cmprsd.${image?.mimetype.split('/')[1]}`;
                console.log(compressedFilePath)
                const compression = 60;

                image?.mv(filePath, async (error, data) => {
                    if (!error) {
                        compressor(filePath, compressedFilePath,
                            {
                                compress_force: false,
                                statistic: true,
                                autoupdate: true
                            },
                            false,
                            {
                                jpg: { engine: "mozjpeg", command: ['-quality', compression] }
                            },
                            {
                                png: { engine: "pngquant", command: ['--quality=' + compression + '-' + compression, '-o'] }
                            },
                            {
                                svg: { engine: 'svgo', command: '--multipass' }
                            },
                            {
                                gif: { engine: 'gifsicle', command: ['--colors', '64', '--use-col=web'] }
                            }, (error) => {

                                if (!error) {
                                    if (fileSystem?.existsSync(filePath)) {
                                        fileSystem?.unlink(filePath, async (error) => {
                                            if (!error) {
                                                return compressedFilePath;
                                            }
                                            else {
                                                throw error;
                                            }
                                        })
                                    }
                                }
                                else {
                                    throw error
                                }
                            })

                    }
                    else {
                        throw error
                    }
                })
            }
        }
        else {
            return 405
        }
    } catch (error) {
        console.log(error);
        return 500;
    }
}

module.exports = CompressImage;