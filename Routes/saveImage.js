const router = require('express').Router();
const fileSystem = require('fs');
const path = require('path')
const removeWhiteSpaces = require('../FNS/removeWhiteSpaces');
require('express-fileupload');
const { ObjectId } = require('mongodb');
const sharp = require('sharp');



router.route('/')

    .post(async (req, res) => {
        try {
            if (!(req?.cookies?.Bearer)) {
                res.sendStatus(401);
            }
            else {
                let isValidUser = await db.collection('users').findOne({ refresher: req?.cookies?.Bearer });

                if (isValidUser === null) {
                    res.sendStatus(403)
                }
                else {
                    if (!req?.files?.file) {
                        res.sendStatus(405);
                    }
                    else {

                        let identifier = `${removeWhiteSpaces(isValidUser?.stagename?.toLowerCase())}${Date.now()}`;
                        let filePath = `${path.join(__dirname, '../uploads')}${req.url}${identifier}.${req.files.file.mimetype.split('/')[1]}`;

                        req.files.file.mv(filePath, (error) => {
                            if (error) {
                                throw error;
                            }
                            else {
                                sharp(filePath)?.resize(500, 500, { fit: "inside", fastShrinkOnLoad: true })?.withMetadata()?.toFile(`${path?.join(__dirname, '..', 'uploads')}/${identifier}-c-img.${req.files?.file?.mimetype?.split('/')[1]}`).then(() => {
                                    const imageURL = `https://muzica.goldcoastuni.com/api/uploads/${identifier}-c-img.${req.files.file.mimetype.split('/')[1]}`;

                                    db.collection('images').insertOne({ userId: isValidUser._id, image: imageURL }).then(async (results) => {
                                        if (Boolean(req?.body?.not_current_content) === true) {
                                            if (fileSystem.existsSync(filePath)) {
                                                fileSystem.unlink(filePath, () => {
                                                    res.sendStatus(200);
                                                });
                                            }
                                        }
                                        else {
                                            if (results?.acknowledged && results?.insertedId) {
                                                let existingCurrentContent = await db.collection('currentconent')?.findOne({ userId: isValidUser?._id });

                                                if (existingCurrentContent !== null) {
                                                    db.collection('currentconent')?.replaceOne({ _id: existingCurrentContent?._id }, { _id: existingCurrentContent?._id, userId: existingCurrentContent?.userId, currentContent: 'images', submitted: 'images' }).then(() => {
                                                        if (fileSystem.existsSync(filePath)) {
                                                            fileSystem.unlink(filePath, () => {
                                                                res.sendStatus(200);
                                                            });
                                                        };
                                                    }
                                                    )
                                                } else {
                                                    db.collection('currentconent')?.insertOne({ userId: isValidUser?._id, currentContent: "images", submitted: "images" }).then((results) => {
                                                        if (results?.insertedId) {
                                                            if (fileSystem.existsSync(filePath)) {
                                                                fileSystem.unlink(filePath, () => {
                                                                    res.sendStatus(200);
                                                                });
                                                            }
                                                        } else {
                                                            res?.sendStatus(204)
                                                        }
                                                    })
                                                }
                                            }
                                            else {
                                                if (fileSystem.existsSync(filePath)) {
                                                    fileSystem.unlink(filePath, () => {
                                                        throw error
                                                    });
                                                }
                                            }
                                        }
                                    });
                                })
                            }
                        })
                    }
                }
            }
        } catch (error) {
            console.log(error);
            res?.sendStatus(500);

        }

    })


module.exports = router;

