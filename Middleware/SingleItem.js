const { ObjectId } = require("mongodb");
const fileSystem = require('fs');
const removeWhiteSpaces = require('../FNS/removeWhiteSpaces');
const path = require('path');
const dateValidator = require('../FNS/DurationValidator');
const sharp = require('sharp');

const SingleItem = async (req, res, next) => {


    let isValidUser;
    let selectedItem, querry;

    if (!req?.cookies?.Bearer) {
        res?.sendStatus(401);
    }
    else {
        try {
            isValidUser = await db.collection('users').findOne({ refresher: req?.cookies?.Bearer });

            if (isValidUser !== null && isValidUser !== undefined) {

                if (req?._parsedUrl?.pathname?.split(':')?.length !== 2 || req?._parsedUrl?.pathname?.split(':')[1]?.length !== 24) {
                    next()
                }
                else {
                    querry = req?._parsedUrl?.pathname?.split(':')[0]?.split('-')[1];
                    selectedItem = await db.collection(`${querry?.toLowerCase()}`).findOne({ _id: ObjectId(req?._parsedUrl?.pathname?.split(':')[1]) })
                }



                if (querry !== undefined && querry !== null && selectedItem !== null && selectedItem !== undefined) {

                    if (req?.method === "GET" && isValidUser !== null && isValidUser !== undefined) {
                        if (selectedItem !== null && selectedItem !== undefined) {
                            res?.status(200)?.json({ results: selectedItem });
                        }
                        else {
                            res?.sendStatus(204);
                        }

                    } else if (req?.method === "PATCH" && isValidUser !== null && isValidUser !== undefined) {
                        //NOTE that biograpgy uses its post request for both edit and posting
                        if (!req?.body) {
                            res?.sendStatus(405);
                        } else {
                            if (querry === 'audios') {
                                if (!req?.body || !req?.body?.datereleased || req?.body?.datereleased?.length <= 0 || !req?.body?.title || req?.body?.title?.length <= 0 || !dateValidator.isValidDate(req?.body?.datereleased) ||
                                    (req.body.applemusic && !(req.body.applemusic?.startsWith('https://') && new URL(req.body.applemusic?.trim())?.origin?.toLowerCase().endsWith('apple.com'))) ||
                                    (req.body.spotify && !(req.body.spotify?.startsWith('https://') && new URL(req.body.spotify?.trim())?.origin?.toLowerCase().endsWith('spotify.com'))) ||
                                    (req.body.audiomack && !(req.body.audiomack?.startsWith('https://') && new URL(req.body.audiomack?.trim())?.origin?.toLowerCase().endsWith('audiomack.com'))) ||
                                    (req.body.youtube && !(req?.body?.youtube?.startsWith('https://') && ((new URL(req?.body?.youtube?.trim())?.origin?.toLowerCase().endsWith('youtube'?.toLowerCase() + ".com"))
                                        || (new URL(req?.body?.youtube)?.origin.endsWith(('youtube'?.toLowerCase()?.slice(0, 5) + '.' + 'youtube'?.trim().slice(5, 8))?.trim()))))) ||
                                    (req.body.soundcloud && !(req.body.soundcloud?.startsWith('https://') && new URL(req.body.soundcloud?.trim())?.origin?.toLowerCase().endsWith('soundcloud.com')))) {
                                    res?.sendStatus(405);
                                }
                                else {
                                    if (req?.files === null) {
                                        db.collection(querry)?.replaceOne({ _id: ObjectId(req?._parsedUrl?.pathname?.split(':')[1]) }, { _id: ObjectId(req?._parsedUrl?.pathname?.split(':')[1]), userId: isValidUser?._id, title: req?.body?.title, coverart: req?.body?.coverart, datereleased: req?.body?.datereleased, applemusic: req?.body?.applemusic, spotify: req?.body?.spotify, audiomack: req?.body?.audiomack, youtube: req?.body?.youtube, soundcloud: req?.body?.soundcloud, uniqueId: req?.body?.uniqueId }).then((results) => {

                                            if (results?.matchedCount > 0) {
                                                res.sendStatus(200)
                                            }
                                            else {
                                                res?.sendStatus(500)
                                            }
                                        })
                                    }
                                    else if (req?.files !== null) {
                                        if (req?.files?.file?.size > (5 * 1024 * 1024)) {
                                            res.sendStatus(405);
                                        }
                                        else {
                                            let identifier = `${removeWhiteSpaces(req.body.title.toLowerCase())}${Date.now()}`;
                                            let ExistingFilePath = `${path.join(__dirname, '../uploads')}/${selectedItem?.coverart?.split('/uploads/')[1]}`;

                                            if (fileSystem.existsSync(ExistingFilePath)) {
                                                fileSystem?.unlink(ExistingFilePath, () => {

                                                })
                                            }

                                            let newfilePath = `${path.join(__dirname, '../uploads')}/${identifier}.${req.files.file.mimetype.split('/')[1]}`;

                                            req.files.file.mv(newfilePath, (error) => {
                                                if (error) {
                                                    res.sendStatus(500)
                                                }
                                                else {
                                                    sharp(newfilePath)?.resize(200, 200, { fit: "cover" })?.withMetadata()?.toFile(`${path?.join(__dirname, '../uploads')}/${identifier}-caca.${req.files.file.mimetype.split('/')[1]}`).then((results) => {

                                                        if (results) {
                                                            const imageURL = `https://muzica.goldcoastuni.com/api/uploads/${identifier}-caca.${req.files.file.mimetype.split('/')[1]}`;

                                                            db.collection(querry)?.replaceOne({ _id: ObjectId(req?._parsedUrl?.pathname?.split(':')[1]) }, { _id: ObjectId(req?._parsedUrl?.pathname?.split(':')[1]), userId: isValidUser?._id, title: req?.body?.title, coverart: imageURL, datereleased: req?.body?.datereleased, applemusic: req?.body?.applemusic, spotify: req?.body?.spotify, audiomack: req?.body?.audiomack, youtube: req?.body?.youtube, soundcloud: req?.body?.soundcloud, uniqueId: identifier }).then((results) => {
                                                                if (results?.matchedCount > 0) {
                                                                    if (fileSystem?.existsSync(newfilePath)) {
                                                                        fileSystem?.unlink(newfilePath, (error) => {
                                                                            if (error) {
                                                                                throw error
                                                                            }
                                                                            else {
                                                                                res?.sendStatus(200)
                                                                            }
                                                                        })
                                                                    }
                                                                    else {
                                                                        res.sendStatus(200)
                                                                    }
                                                                }
                                                                else {
                                                                    if (fileSystem.existsSync(newfilePath)) {
                                                                        fileSystem.unlink(newfilePath, () => {
                                                                            res.sendStatus(500);
                                                                        });
                                                                    }
                                                                }
                                                            })
                                                        }
                                                    })

                                                }
                                            })
                                        }
                                    }
                                }

                            }
                            else if (querry === 'videos') {
                                if (!req?.body || !req?.body?.title || req?.body?.title?.length <= 0 || req?.body?.link <= 0 || !req?.body?.link || !req?.body?.dateReleased || !new Date(req?.body?.dateReleased) || !dateValidator.isValidDate(req?.body?.dateReleased) || !(req.body.link && (req?.body?.link?.startsWith('https://') && ((new URL(req?.body?.link?.trim())?.origin?.toLowerCase().endsWith('youtube'?.toLowerCase() + ".com"))
                                    || (new URL(req?.body?.link)?.origin.endsWith(('youtube'?.toLowerCase()?.slice(0, 5) + '.' + 'youtube'?.trim().slice(5, 8))?.trim())))))) {
                                    res?.sendStatus(405);
                                }
                                else {
                                    db.collection(querry).replaceOne({ _id: ObjectId(req?._parsedUrl?.pathname?.split(':')[1]) }, { _id: ObjectId(req?._parsedUrl?.pathname?.split(':')[1]), userId: isValidUser?._id, title: req?.body?.title, link: req?.body?.link, dateReleased: req?.body?.dateReleased }).then((results) => {
                                        if (results?.matchedCount > 0) {
                                            res.sendStatus(200);
                                        }
                                        else {
                                            res?.sendStatus(204);
                                        }
                                    })
                                }

                            }
                            else if (querry === 'upcoming') {
                                if ((!req?.body || !req?.body?.type || req?.body?.type.length <= 0 || !dateValidator.equal_To_Or_Bigger_Than_Toadys_Date(req?.body?.date) || req?.body?.date.length <= 0 || !req?.body?.specifics || req?.body?.specifics.length <= 0 || !req?.body?.description || req?.body?.description.length <= 0)) {
                                    res?.sendStatus(405);
                                }
                                else {
                                    db.collection(querry).replaceOne({ _id: ObjectId(req?._parsedUrl?.pathname?.split(':')[1]) }, { _id: ObjectId(req?._parsedUrl?.pathname?.split(':')[1]), userId: isValidUser?._id, type: req?.body?.type, date: req?.body?.date, specifics: req?.body?.specifics, description: req?.body?.description }).then((results) => {

                                        if (results?.matchedCount > 0) {
                                            res?.sendStatus(200);
                                        }
                                        else {
                                            res?.sendStatus(204);
                                        }
                                    });
                                }

                            }
                            else if (querry === 'news') {
                                if (!req?.body || !req?.body?.details || !req?.body?.headline || req?.body?.details?.length <= 0 || req?.body?.headline.length <= 0) {
                                    res.sendStatus(405);
                                }
                                else {
                                    db.collection(querry).replaceOne({ _id: ObjectId(req?._parsedUrl?.pathname?.split(':')[1]) }, { _id: ObjectId(req?._parsedUrl?.pathname?.split(':')[1]), userId: isValidUser?._id, headline: req?.body?.headline, details: req?.body?.details }).then((results) => {
                                        if (results?.matchedCount > 0) {
                                            res?.sendStatus(200)
                                        }
                                        else {
                                            res?.sendStatus(204);
                                        }
                                    })
                                }
                            }
                        }
                    } else if (req?.method === "PUT" && isValidUser !== null && isValidUser !== undefined) {

                        if (selectedItem !== null && selectedItem !== undefined) {
                            if (querry === 'audios' || querry === 'images') {
                                db.collection(querry).deleteOne({ _id: selectedItem?._id }).then((results) => {
                                    if (results?.deletedCount > 0) {
                                        let ExistingFilePath;
                                        if (querry === 'audios') {
                                            ExistingFilePath = `${path.join(__dirname, '../uploads')}/${selectedItem?.coverart?.split('/uploads/')[1]}`;
                                        } else if (querry === 'images') {

                                            ExistingFilePath = `${path.join(__dirname, '../uploads')}/${selectedItem?.image?.split('/uploads/')[1]}`;
                                        }

                                        if (fileSystem?.existsSync(ExistingFilePath)) {
                                            fileSystem?.unlink(ExistingFilePath, () => {
                                                res.sendStatus(200);
                                            })
                                        } else {
                                            res?.sendStatus(200);
                                        }
                                    }
                                    else {
                                        res?.sendStatus(500);
                                    }
                                })
                            }
                            else {

                                db.collection(querry).deleteOne({ _id: selectedItem?._id }).then((results) => {
                                    if (results?.deletedCount > 0) {
                                        res?.sendStatus(200);
                                    }
                                    else {
                                        res?.sendStatus(204);
                                    }
                                })
                            }
                        } else {
                            res?.sendStatus(204)
                        }

                    }
                }
                else {
                    res?.sendStatus(403);
                }
            }

        } catch (error) {
            console.log(error);
            res?.sendStatus(500);
        }
    }
}

module.exports = SingleItem;