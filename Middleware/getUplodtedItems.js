
const { ObjectId } = require("mongodb");
const DurationValidator = require('../FNS/DurationValidator')


const getUploadedData = async (req, res, next) => {
    console.log(req?.cookies?.Bearer)
    try {
        if (!req?.cookies?.Bearer) {
            res.sendStatus(401);
        }
        else {
            let isValidUser = await db.collection('users').findOne({ refresher: req?.cookies?.Bearer });

            if (isValidUser === null) {
                res?.sendStatus(403)
            }
            else {
                let querry = req?._parsedUrl?.pathname?.slice(1, req?._parsedUrl?.pathname?.length).split('-')[2];
                let Unexpired = [];

                if (req?._parsedUrl?.pathname?.includes(':')) {
                    next()
                }
                else {


                    if (isValidUser !== null && isValidUser !== undefined) {
                        let addedItems = await db.collection(`${querry}`).find({ userId: isValidUser?._id }).toArray();
                        if ((querry === 'audios' || querry === 'videos' || querry === 'images' || querry === 'biography' || querry === 'news')) {
                            if (addedItems !== null && addedItems !== undefined) {
                                if (addedItems?.length > 0) {
                                    res.status(200).json({ querry, addedItems })
                                }
                                else {
                                    res.sendStatus(204)
                                }
                            }
                            else {
                                res?.sendStatus(204)
                            }
                        }
                        else if (querry === 'socialmedia') {
                            await db.collection('bookings-info').findOne({ userId: isValidUser?._id }).then((results) => {
                                if (results !== null && results !== undefined) {
                                    res.status(200).json({ querry, addedItems, bookings: results })
                                }
                                else {
                                    res.sendStatus(204);
                                }
                            })
                        }
                        else if (querry === 'upcoming') {
                            addedItems?.forEach((element) => {
                                if (DurationValidator.equal_To_Or_Bigger_Than_Toadys_Date(element?.date)) {
                                    Unexpired.push(element);
                                }
                            })


                            if (Unexpired?.length > 0) {
                                res?.status(200)?.json({ querry, addedItems: Unexpired });
                            } else {
                                res.sendStatus(204)
                            }
                        }
                    }
                    else {
                        res.sendStatus(204)
                    }
                }
            }

        }
    } catch (error) {
        console.log(error);
        res?.sendStatus(500)
    }
}

module.exports = getUploadedData;