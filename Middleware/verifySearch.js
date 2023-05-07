const { ObjectId } = require('mongodb')

const verifySearch = (async (req, res, next) => {

    if (!(String(req?.method) === String("POST"))) {
        next();
    }
    else {
        try {
            const requestURL = `${req?.get('origin')}${req.url}`;

            if ((req?.get('origin') !== undefined) && (req?.get('origin') !== null)) {

                if (requestURL.split('?').length === 0 || !(new URL(requestURL)?.searchParams?.has('id') && new URL(requestURL)?.searchParams?.has("artiste"))) {
                    next();
                } else {

                    if (new URL(requestURL)?.searchParams.has("id") && new URL(requestURL)?.searchParams.has("artiste")) {
                        let id = new URL(requestURL)?.searchParams.get("id");

                        if ((id?.length === 24 && !id?.endsWith('/')) || (id?.length === 25 && id?.endsWith('/'))) {
                            if ((id?.length === 25 && id?.endsWith('/'))) {
                                id = id?.slice(0, id?.length - 1)
                            }
                            let isValidUserWebsite = await db.collection('users').findOne({ _id: ObjectId(id) });


                            if (isValidUserWebsite === null || isValidUserWebsite === undefined) {
                                res.sendStatus(404);
                            } else {

                                let requestedData = req?.url?.split('?')[0].split('/webpage/')[1];
                                //get all posts from Database

                                let unfilteredItems = await db.collection(requestedData).find({ userId: isValidUserWebsite._id }).toArray();

                                let searchedItems = [];
                                unfilteredItems.forEach(element => {
                                    if (String(element?.title) === String(req?.body?.searchFor) || String(element?.title)?.includes(String(req?.body?.searchFor))) {
                                        searchedItems.push(element);
                                    }
                                });

                                if (searchedItems.length > 0) {
                                    res.status(200).json({ searchedItems })
                                }
                                else {
                                    res.sendStatus(204)
                                }
                            }
                        } else {
                            res.sendStatus(404);
                        }
                    }
                }
            }
        } catch (error) {
            console.log(error)
            res?.sendStatus(500)
        }
    }
})

module.exports = verifySearch;


